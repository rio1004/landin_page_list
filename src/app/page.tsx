import CardHolder from "@/components/CardHolder";
import Tabs from "../components/tabs";
import React from "react";
export default function Home() {
  return (
    <div className="lg:p-14 lg:pt-5 md:p-0 bg-[#101010] text-[#fff]">
      <div className="Title flex justify-center mt-10 md:mt-0">
        <h1 className="text-4xl font-black">落地页模版演示</h1>
      </div>
      <Tabs />
      <CardHolder />
    </div>
  );
}
