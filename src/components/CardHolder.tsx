"use client";

import { showModal, tabActive } from "@/store/atoms";
import Card from "./card";
import { cards } from "./cards";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { motion, Variants } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CardHolder = () => {
  const [activeTab, setActiveTab] = useAtom(tabActive);
  const [activeCards, setActiveCards] = useState([]);
  const [showMd, setShowModal] = useAtom(showModal);
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    renderCards();
  }, [activeTab]);

  const renderCards = () => {
    let favStorage = localStorage.getItem("favorites");
    if (!favStorage) {
      localStorage.setItem("favorites", JSON.stringify([]));
      favStorage = localStorage.getItem("favorites");
    } else {
      const idsToFilter = JSON.parse(favStorage);
      if (activeTab === "favorites") {
        const filteredCards = cards.filter((card) =>
          idsToFilter.includes(card.id)
        );
        console.log(filteredCards, "filters");
        setActiveCards(filteredCards);
      } else {
        setActiveCards(cards);
      }
    }
    if (activeCards.length > 10) {
      setShowPagination(true);
    }
    const pages = activeCards.length / 10;
    console.log(Math.ceil(pages));
  };
  const next = () => {};
  const prev = () => {};
  const customPage = () => {};
  return (
    <>
      {showMd ? (
        <motion.div
          variants={{
            open: { opacity: 1, display: "block" },
            close: { opacity: 0, display: "none" },
          }}
          animate={showMd ? "open" : "close"}
        >
          <ModalComponent />
        </motion.div>
      ) : (
        ""
      )}

      <div
        className={`cardHolder grid ${
          activeCards.length < 5 ? "grid-cols-5" : "grid-auto-fit-[20rem]"
        } gap-4 ${showMd ? "blur-lg" : ""}`}
      >
        {activeCards.map((item) => (
          <Card
            key={item.url}
            url={item.url}
            title={item.title}
            isFav={item.isFav}
            id={item.id}
          />
        ))}
      </div>

      {showPagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default CardHolder;
