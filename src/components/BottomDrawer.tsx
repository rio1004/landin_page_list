import Image from "next/image";
import React from "react";
import Button from "./Button";
import { modalUrl, showModal } from "@/store/atoms";
import { useAtom } from "jotai";

type BottomProps = {
  handleClose: () => void;
  url: string;
};

const BottomDrawer = ({ handleClose, url }: BottomProps) => {
  const [showMd, setShowModal] = useAtom(showModal);
  const [, setUrl] = useAtom(modalUrl);

  const openModal = () => {
    setShowModal(true);
    setUrl(url);
    const favStorage = localStorage.getItem("favorites");
    if (!favStorage) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  };
  return (
    <div className="flex flex-col items-center absolute bottom-0 bg-white h-[120px] w-[100%] rounded-2xl text-[#4E4E4E] font-black">
      <div className="title flex justify-center w-[80%] relative mt-2 border-b border-[#E6E6E6] pb-[5px]">
        <h1>选择操作</h1>
        <div className="close absolute right-0" onClick={() => handleClose()}>
          <Image
            src="/images/close.svg"
            alt={"close Button"}
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="btn-group flex h-[100%] items-center gap-[10px]">
        <div onClick={() => openModal()}>
          <Button icon="/images/eye.svg" title="扩大" />
        </div>
        <a href={url} target="_blank">
          <Button icon="/images/goto.svg" title="转至链接" />
        </a>
      </div>
    </div>
  );
};

export default BottomDrawer;
