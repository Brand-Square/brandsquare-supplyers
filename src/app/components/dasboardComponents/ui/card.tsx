 'use client'
import React from 'react'
import PercentageIcon from '../../../../../public/assets/icons/percentageIcon'
 import { motion } from 'framer-motion';


interface cardProps {
 icon: React.ReactNode,
    title: string,
    percentage: string,
    number: string,
}
 

const card:React.FC<cardProps> = ({icon, title, percentage, number}) => {
  return (
    
         <div className='bg-white rounded-[16px] border shadow-md px-5 py-3'>
           <div className=' flex items-center gap-2'>
           <motion.div
      className="icon bg-secondary-blue rounded-[8px] p-[6px] border border-theme-blue-primary"
      // animate={{
      //   scale: [1, 1.1, 1], // Scale it up and then down
      //   rotate: [0, 5, 0], // Slight rotation
      // }}
      // transition={{
      //   duration: 2, // Animation duration
      //   repeat: Infinity, // Repeat infinitely
      //   ease: 'easeInOut', // Smooth easing
      // }}
    >
      {icon}
    </motion.div>
           <span className='text-[14px]'>{title}</span>
           </div>
           <div  className=' flex items-center gap-2 my-2'>
            <div className=' flex items-center justify-center bg-secondary-blue rounded-xl px-[6px] py-1 '>
           <PercentageIcon />
              <span className=' text-[10px]'>{percentage}%</span>
            </div>
            <span className=' text-theme-text-gray text-[12px]'>Compared to last month</span>
           </div>
           <div>
              <span className=' font-semibold  text-[25px] md:text-[27px]'>{number ? number : '0'}</span>
           </div>  
         </div>
 
  )
}

export default card