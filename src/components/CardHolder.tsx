"use client";

import React from "react";
import { cardPage, showModal, tabActive } from "@/store/atoms";
import Card from "./card";
import { cards } from "./cards";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { motion } from "framer-motion";

import { Separator } from "./ui/separator";
import Image from "next/image";
import PlatformLink from "./PlatformLink";
import PaginationComponent from "./Pagination";
// Define the type for card objects
interface CardType {
  id: number;
  url: string;
  title: string;
  isFav: boolean;
}

const CardHolder = () => {
  const [activeTab, setActiveTab] = useAtom(tabActive);
  const [activeCards, setActiveCards] = useState<CardType[]>([]);
  const [showMd, setShowModal] = useAtom(showModal);
  const [page, setPage] = useAtom(cardPage);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>();
  const [pageNumber, setPageNumber] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<CardType[]>([]);
  const [activePlatform, seActivePlatform] = useState<string>("all");

  useEffect(() => {
    renderCards();
  }, [activeTab, activePlatform]);

  const renderCards = () => {
    let favStorage = localStorage.getItem("favorites");
    let cardPlatforms = cards;
    if (!favStorage) {
      localStorage.setItem("favorites", JSON.stringify([]));
      favStorage = localStorage.getItem("favorites");
    }
    if (activePlatform != "all") {
      cardPlatforms = cards.filter((site) => {
        return site?.platform == activePlatform;
      });
    }

    console.log(cardPlatforms, "cardsSHESShh");
    const idsToFilter = JSON.parse(favStorage || "[]");
    if (activeTab === "favorites") {
      console.log(cardPlatforms, "cardPlatfomrs");
      const filteredCards = cardPlatforms.filter((card) =>
        idsToFilter.includes(card.id)
      );
      console.log(filteredCards, "filtered");
      setActiveCards(filteredCards);
    } else {
      setActiveCards(cardPlatforms);
    }
  };

  useEffect(() => {
    console.log("total cards: " + activeCards.length, total);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(activeCards.slice(startIndex, endIndex));
    const pageNum = Math.ceil(activeCards.length / pageSize);
    const pageArray = Array.from({ length: pageNum }, (_, i) => i + 1);
    if (pageArray) {
      setPageNumber(pageArray);
    }
    console.log(pageNumber, "page number");
  }, [page, pageSize, activeCards]);

  const next = () => {
    if (page < Math.ceil(activeCards.length / pageSize)) setPage(page + 1);
  };
  const prev = () => {
    if (page > 1) setPage(page - 1);
  };
  const customPage = (pageNum: number) => setPage(pageNum);
  const handlePageSize = (val: string) => {
    setPageSize(Number(val));
    console.log("pageSize" + val);
  };

  const changePlatform = (val: string) => {
    seActivePlatform(val);
    setPage(1);
  };
  const cardHolderStyle = {
    emptyStyle: "box border-4 border-dashed border-collapse w-[550px] h-[250px] flex justify-center flex-col items-center gap-5", 
    filterStyle: `flex justify-center mb-[50px] ${showMd ? "blur-lg" : ""}`

  }
  // const emptyStyle = 
  return (
    <>
      {showMd && (
        <motion.div
          variants={{
            open: { opacity: 1, display: "block" },
            close: { opacity: 0, display: "none" },
          }}
          animate={showMd ? "open" : "close"}
        >
          <ModalComponent />
        </motion.div>
      )}
      <div className={cardHolderStyle.filterStyle}>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <PlatformLink
            title="所有平台"
            activePlatform={activePlatform}
            changePlatform={changePlatform}
            platform="all"
          />
          <Separator orientation="vertical" />
          <PlatformLink
            title="易发"
            activePlatform={activePlatform}
            changePlatform={changePlatform}
            platform="yifa"
          />
          <Separator orientation="vertical" />
          <PlatformLink
            title="新葡京"
            activePlatform={activePlatform}
            changePlatform={changePlatform}
            platform="lisboa"
          />
        </div>
      </div>
      <div
        className={`cardHolder grid ${
          paginatedData.length < 5
            ? `lg:grid-cols-5 md:gap-10`
            : "grid-auto-fit-[20rem]"
        } gap-4 ${showMd ? "blur-lg" : ""}`}
      >
        {paginatedData.map((item) => (
          <Card
            key={item.url}
            url={item.url}
            title={item.title}
            isFav={item.isFav}
            id={item.id}
          />
        ))}
      </div>
      {paginatedData.length == 0 ? (
        <div className="flex justify-center h-[50vh] items-center">
          <div className={cardHolderStyle.emptyStyle}>
            <Image
              src={"/images/Frame.svg"}
              width={100}
              height={100}
              color="#fff"
              alt="data image"
            />
            <h1 className="font-black text-[20px]">没有可用数据</h1>
          </div>
        </div>
      ) : (
        <PaginationComponent
          showMd={showMd}
          prev={prev}
          pageNumber={pageNumber}
          page={page}
          next={next}
          activeCards={activeCards}
          handlePageSize={handlePageSize}
          pageSize={pageSize}
          customPage={customPage}
        />
      )}
    </>
  );
};

export default CardHolder;
