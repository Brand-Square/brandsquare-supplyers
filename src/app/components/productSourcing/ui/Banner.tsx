// productSourcing/Banner.tsx

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const Banner = () => {
  const router = useRouter();

  const handleRequestProduct = () => {
    router.push('/product-sourcing/product-request')
  }
  return (
    <div className={`my-[2.5%] rounded-xl shadow-lg bg-[#000051] relative pt-[10%] pb-[20%] md:py-9 px-[7%] xl:px-20 overflow-hidden`}>
      <div className=" md:my-9 md:max-w-[550px]">
        <div className="text mt-5">
          <h1 className="text-white tracking-wide w-full font-semibold  text-[5vw] sm:text-[25px] sm:w-[50vw] xl:text-[30px] lg:w-[40vw] 2xl:w-[30vw] ">
            SIMPLIFYING PROCUREMENT FOR BRANDS EVERYWHERE
          </h1>
          <p className="text-[#FFFFFFDE] w-[65%] text-[2.8vw] sm:pt-0 pt-3 sm:pb-0 pb-3 xl:w-[75%] md:text-sm xl:mt-2 xl:tracking-wide">
            Lorem ipsum dolor sit amet consectetur. Vitae volutpat lectus quam
            nisi ipsum amet interdum ante egestas.
          </p>
          <button
            className="bg-white px-[3.5vw] mt-[3%] font-bold text-[4vw] rounded-lg py-[1.6vh] sm:px-[2vw] sm:text-base xl:py-5 xl:text-base xl:px-5"
            onClick={handleRequestProduct}
          >
            Request a product
          </button>
        </div>
      </div>
      <div className="aspect-auto lg:block hidden">
        <Image
          quality={100}
          width={500}
          height={500}
          alt="banner image"
          className="absolute bottom-0 lg:-right-[3%] lg:w-[53%] h-[90%] 2xl:w-[47%] "
          src="/assets/newDesignAssets/bannerImage1.png"
        />
      </div>
      <div className=" aspect-auto lg:hidden block">
        <Image
          quality={100}
          width={600}
          height={600}
          alt="banner image"
          className="absolute w-[100%] h-[63%] md:w-[50%] md:h-[70%] bottom-0 -right-[28%] md:right-0"
          src="/assets/newDesignAssets/bannerImage1.png"
        />
      </div>
    </div>
  );
}

export default Banner