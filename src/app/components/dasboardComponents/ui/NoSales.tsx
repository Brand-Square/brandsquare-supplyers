import React from 'react'
import NotePad from '../../../../../public/assets/icons/notePad.svg'
import Image from 'next/image'

const NoSales = ({text, subtext}: {text:string,subtext:string}) => {
  return (
    <div className=' flex flex-col items-center justify-center w-full py-7'> 

     <Image width={100} height={100} src={NotePad} alt='note pad' />
     <div className="text text-center">
        <span className=' block py-1 font-semibold text-[#2A2B2D]'>{text}</span>
        <span> <span className=' text-theme-yellow cursor-pointer hover:text-opacity-50 transition-opacity'>Upload products</span>{subtext}</span>
     </div>
    </div>
  )
}

export default NoSales