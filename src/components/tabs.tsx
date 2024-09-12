"use client";

import { useAtom } from "jotai";
import { tabActive } from "../store/atoms";
import { useEffect } from "react";

const Tabs = () => {
  // Use a state to keep track of the active tab
  const [activeTab, setActiveTab] = useAtom(tabActive);
  return (
    <div className="flex justify-center gap-4 p-5">
      <div
        onClick={() => setActiveTab("all")}
        className={`py-[5px] px-[30px] rounded-[100px] cursor-pointer ${
          activeTab === "all"
            ? "bg-gradient-to-r from-[#fefeea] to-[#ffcd96] border-[#ffcd96] text-[#1C1C1C]"
            : "border-[#FFCD96] text-[#FFCD96] border-2"
        } flex justify-center items-center`}
      >
        全部
      </div>
      <div
        onClick={() => setActiveTab("favorites")}
        className={`py-[5px] px-[30px] rounded-[100px] cursor-pointer ${
          activeTab === "favorites"
            ? "bg-gradient-to-r from-[#fefeea] to-[#ffcd96] border-[#ffcd96] text-[#1C1C1C]"
            : "border-[#FFCD96] text-[#FFCD96] border-2"
        } flex justify-center items-center`}
      >
        收藏
      </div>
    </div>
  );
};

export default Tabs;
