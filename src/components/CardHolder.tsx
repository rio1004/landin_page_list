"use client";

import { showModal, tabActive } from "@/store/atoms";
import Card from "./card";
import { cards } from "./cards";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
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
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>();
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState();
  const [paginatedData, setPaginatedData] = useState<CardType[]>([]);

  useEffect(() => {
    renderCards();
  }, [activeTab]);

  const renderCards = () => {
    let favStorage = localStorage.getItem("favorites");
    if (!favStorage) {
      localStorage.setItem("favorites", JSON.stringify([]));
      favStorage = localStorage.getItem("favorites");
    }

    const idsToFilter = JSON.parse(favStorage || "[]");
    if (activeTab === "favorites") {
      const filteredCards = cards.filter((card) =>
        idsToFilter.includes(card.id)
      );
      setActiveCards(filteredCards);
    } else {
      setActiveCards(cards);
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={prev} />
          </PaginationItem>
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
          {pageNumber && pageNumber.length > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            ""
          )}

          <PaginationItem>
            <PaginationNext onClick={next} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default CardHolder;
