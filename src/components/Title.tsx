"use client"
import { showModal } from "@/store/atoms";
import { useAtom } from "jotai";
import React from "react";

type Props = {};

const Title = (props: Props) => {
  const [showMd, setShowModal] = useAtom(showModal);

  return (
    <div
      className={`Title flex justify-center mt-10 md:mt-0 ${
        showMd ? "blur-lg" : ""
      }`}
    >
      <h1 className="text-4xl font-black">落地页模版演示</h1>
    </div>
  );
};

export default Title;
