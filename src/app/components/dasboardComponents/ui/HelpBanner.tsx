'use client'
import React, { useState } from 'react'
import DashBtn from './DashBtn'
import Times from '../../../../../public/assets/icons/Times'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '@/app/components/variants/exitVariant'
import { useRouter } from 'next/navigation' 

const HelpBanner = ({ title, text, img, route }: { title: string, text: string, img: string, route?: string }) => {
  const [show, setShow] = useState(true)
  const router = useRouter() 

 
  const handleSupportClick = () => {
    if (route) {
      router.push(route) 
    }
  }

  return (
    <> 
      <AnimatePresence> 
        {show && (
          <motion.div
            className='w-full mb-[14px]'
            initial="visible"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div
              className="relative px-2 md:px-6 flex flex-row-reverse justify-between items-start sm:block rounded-xl overflow-hidden py-4"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div
                onClick={() => setShow(false)}
                className='sm:absolute cursor-pointer top-1 right-5 z-10'
              >       
                <Times />
              </div>
              <div className='relative z-20 sm:my-2 flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0'>
                <div className='  '>
                  <h3 className='text-black text-[14px] md:text-[18px] font-bold leading-tight mb-2'>
                    {title}
                  </h3>
                  <p className='text-theme-text-gray text-[12px] md:text-base'>
                    {text}
                  </p>
                </div>
                <div className='max-w-[100px] sm:max-w-[200px]'>
                  <DashBtn 
                    styling='border-theme-text-gray bg-theme-blue border text-theme-text-gray ' 
                    text='Access Support' 
                    onClick={handleSupportClick} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HelpBanner