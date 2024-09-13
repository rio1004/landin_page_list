"use client";

type PlatformProps = {
  activePlatform: string;
  changePlatform: (val: string) => void;
  title: string;
  platform: string; // "all", "yifa", "vertical", "horizontal"
};

const PlatformLink = ({
  activePlatform,
  changePlatform,
  title,
  platform,
}: PlatformProps) => {
  return (
    <div
      className={`${
        activePlatform == platform
          ? "font-black text-[18px] text-[#FEE4A0]"
          : ""
      } hover:text-[#FEE4A0] transition-all`}
      onClick={() => changePlatform(platform)}
    >
      {title}
    </div>
  );
};

export default PlatformLink;
