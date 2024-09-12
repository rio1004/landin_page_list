import Image from "next/image";

type ButtonProps = {
  icon: string;
  title: string;
};

const Button = ({ icon, title }: ButtonProps) => {
  return (
    <div className="view flex items-center w-[120px] h-[35px] justify-center hover:shadow-lg transition-all border-[2px] rounded-full border-[#4E4E4E] gap-[10px] bg-white">
      <Image
        src={icon}
        alt={"View Button"}
        width={24}
        height={24}
        style={{ objectFit: "contain" }}
      />
      <p className="text-[14px]">{title}</p>
    </div>
  );
};

export default Button;
