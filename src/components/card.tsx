"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BottomDrawer from "./BottomDrawer";
import { motion, Variants } from "framer-motion";

type CardProps = {
  url: string;
  title: string;
  isFav: boolean;
  id: number;
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const Card = ({ url, title, id }: CardProps) => {
  const [favorite, setIsFav] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  useEffect(() => {
    const favStorage = localStorage.getItem("favorites");
    if (!favStorage) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
    if (favStorage) {
      const parseFavorite = JSON.parse(favStorage);
      if (!parseFavorite.includes(id)) {
        setIsFav("/images/star.png");
      } else {
        setIsFav("/images/fillStar.png");
      }
    }
  }, []);
  const showMoadal = () => {
    console.log("click");
  };
  const onEnter = () => {
    setIsHovered(true);
  };
  const handleClose = () => {
    setIsHovered(false);
  };
  const toggleFavorite = () => {
    const favStorage = localStorage.getItem("favorites");

    let favorites = favStorage ? JSON.parse(favStorage) : [];

    if (!favorites.includes(id)) {
      favorites.push(id);
      console.log("Added to favorites:", favorites);
      setIsFav("/images/fillStar.png");
    } else {
      favorites = favorites.filter((favId) => favId !== id);
      console.log("Removed from favorites:", favorites);
      setIsFav("/images/star.png");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className="card flex justify-center flex-col items-center"
      onClick={() => showMoadal()}
      onMouseEnter={() => onEnter()}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="frameHolder relative">
        <iframe
          className="rounded-2xl border-white border-2"
          src={url}
          height="500px"
        >
          Your browser does not support iframes.
        </iframe>
        <motion.div
          variants={itemVariants}
          animate={isHovered ? "open" : "closed"}
        >
          <BottomDrawer handleClose={handleClose} url={url} />
        </motion.div>
      </div>
      <div className="description flex justify-between my-5 w-[80%] max-w-[280px]">
        <p className="text-2xl font-black">{title}</p>
        <div onClick={() => toggleFavorite()}>
          <Image
            src={favorite || "/images/star.png"}
            alt={"rating"}
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
