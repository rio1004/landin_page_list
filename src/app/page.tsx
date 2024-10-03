import CardHolder from "@/components/CardHolder";
import Tabs from "../components/tabs";
import React from "react";
import Title from "@/components/Title";
export default function Home() {
  return (
    <div className="lg:p-14 lg:pt-5 md:p-0 bg-[#101010] text-[#fff]">
      <Title/>
      <Tabs />
      <CardHolder />
    </div>
  );
}
