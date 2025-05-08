import Image from "next/image";
import React from "react";
import spinner from "../../../../../public/assets/svg/spinner.svg";
interface DashBtnProps {
  styling?: string;
  icon?: string;
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const DashBtn: React.FC<DashBtnProps> = ({
  styling,
  icon,
  text,
  onClick,
  isLoading,
}) => {
  return (
    <button
      type="submit"
      className={`  w-full hover:opacity-85  hover:scale-105 transform transition-all  p-2  sm:px-8 sm:py-2  whitespace-nowrap font-semibold rounded-[10px]  bg-[#FACC15] text-white  text-[12px] sm:text-[14px]  flex items-center cursor-pointer gap-1 justify-center  text-center ${styling}`}
      onClick={onClick}
    >
      {icon && (
        <Image
          width={20}
          height={20}
          src={icon}
          alt="icon"
          className=" md:w-5 md:h-5 w-3 h-3"
        />
      )}
      <div className="flex justify-center items-center gap-1">
        {text}
        {isLoading && <Image alt="loading" src={spinner} />}
      </div>
    </button>
  );
};

export default DashBtn;
