import React from 'react'
import DashBtn from '../dasboardComponents/ui/DashBtn'
import Image, { StaticImageData } from 'next/image'


const CategoryBanner = ({
  title,
  img,
  bgImg,
  styleText,
  styleBtn,
}: {
  title: string;
  img: StaticImageData;
  bgImg: string;
  styleText?: string;
  styleBtn?: string;
  }) => {

  
  return (
    <div className={`${bgImg}    relative px-6 py-7 `}>
      <div className="text text-left">
        <span className={` ${styleText} `}>{title}</span>
        <div className="w-fit mt-2">
          <DashBtn
            text="Order now"
            styling={`bg-theme-blue text-[13px]  ${styleBtn}`}
          />
        </div>
      </div>
      <div className="img absolute    bottom-0 right-0">
        <Image src={img} alt="" width={100} height={100} />
      </div>
    </div>
  );
};

export default CategoryBanner