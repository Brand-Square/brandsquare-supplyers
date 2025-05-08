 'use client'
import React, { useState } from 'react'
 import Times from '../../../../../public/assets/icons/Times'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {modalVariants} from '@/app/components/variants/exitVariant'


 
const Banner = () => {
    // bg-[url('/assets/svg/Banner2.svg')]
    const [show, setShow] =  useState(true)

  return (
    <> 
        <AnimatePresence> 
    {show &&
     <motion.div className='   h-[12px] mb-20' initial="hidden"
     animate="visible"
     exit="exit"
     variants={modalVariants}>
       
    <div className=" relative  bg-[url('/assets/svg/Banner2.svg')] m-0 px-6 bg-center bg-cover      bg-no-repeat rounded-[10px]">
    <div className=' flex    flex-row-reverse justify-between items-start sm:block  py-3'> 
    <div onClick={() => setShow(false)} className=' sm:absolute top-2 cursor-pointer right-5  z-10'>       
          <Times />
        </div>
         <div className=' relative  sm:my-1 flex md:flex-row flex-col justify-between  md:items-center  sm:mt-2  '>
            <div className='  '>
                <h3 className=' text-black font-bold text-[16px] '>Add business hours to your profile</h3>
             </div>
            <div>
                <Link href='/dashboard/profile'>
                <span className=' font-bold cursor-pointer   text-[12px] md:text-[15px]'>Complete profile</span>
                </Link>
             </div>
        </div>
    </div>
    </div>
    
    </motion.div>}
    </AnimatePresence>
    </>
  )
}

export default Banner

 