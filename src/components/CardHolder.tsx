"use client";

import { cardPage, showModal, tabActive } from "@/store/atoms";
import Card from "./card";
import { cards } from "./cards";
import { useAtom } from "jotai";
import { act, useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
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
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState();
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
      <div className="platforms flex justify-center mb-[50px]">
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div
            className={`${
              activePlatform == "all"
                ? "font-black text-[18px] text-[#FEE4A0]"
                : ""
            } hover:text-[#FEE4A0] transition-all`}
            onClick={() => changePlatform("all")}
          >
            所有平台
          </div>
          <Separator orientation="vertical" />
          <div
            className={`${
              activePlatform == "vertical"
                ? "font-black text-[18px] text-[#FEE4A0]"
                : ""
            } hover:text-[#FEE4A0] transition-all`}
            onClick={() => changePlatform("vertical")}
          >
            垂直的
          </div>
          <Separator orientation="vertical" />
          <div
            className={`${
              activePlatform == "horizontal"
                ? "font-black text-[18px] text-[#FEE4A0]"
                : ""
            } hover:text-[#FEE4A0] transition-all`}
            onClick={() => changePlatform("horizontal")}
          >
            水平的
          </div>
        </div>
      </div>

      <div
        className={`cardHolder grid ${
          paginatedData.length < 5 ? "grid-cols-5" : "grid-auto-fit-[20rem]"
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
          <div className="box  border-4 border-dashed border-collapse w-[550px] h-[250px] flex justify-center flex-col items-center gap-5">
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={prev} />
            </PaginationItem>
            {/* <PaginationLink onClick={() => customPage(1)}>首页</PaginationLink> */}
            {pageNumber &&
              pageNumber.map((pageNumber) => (
                <PaginationItem>
                  {pageNumber == page ? (
                    <PaginationLink
                      isActive
                      onClick={() => customPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  ) : (
                    <PaginationLink onClick={() => customPage(pageNumber)}>
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            {/* {pageNumber && pageNumber.length > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            ""
          )} */}
            {/* <PaginationItem>
            <PaginationLink
              onClick={() =>
                customPage(Math.ceil(activeCards.length / pageSize))
              }
            >
              最后页
            </PaginationLink>
          </PaginationItem> */}

            <PaginationItem>
              <PaginationNext onClick={next} />
            </PaginationItem>
          </PaginationContent>
          <Button variant="outline" disabled className="ml-2">
            {activeCards.length + " 个"}
          </Button>
          <Select
            onValueChange={(val) => {
              handlePageSize(val);
            }}
          >
            <SelectTrigger className="w-[100px] ml-2">
              <SelectValue placeholder={pageSize + " 个/页"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 个/页</SelectItem>
              <SelectItem value="20">20 个/页</SelectItem>
              <SelectItem value="30">30 个/页</SelectItem>
              <SelectItem value="40">40 个/页</SelectItem>
              <SelectItem value="50">50 个/页</SelectItem>
            </SelectContent>
          </Select>
        </Pagination>
      )}
    </>
  );
};

export default CardHolder;
