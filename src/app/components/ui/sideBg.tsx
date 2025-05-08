import React from 'react'
import sideBg from '../../../../public/assets/images/bg.png'
 import Image from 'next/image'

const SideBG = () => {
  return (
   
<><div className="fixed left-0 top-0 w-1/2 h-screen  ">
    <Image 
        src={sideBg} 
        alt="Side Background" 
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 rounded-r-[70px]"
    />
</div> 
 
</>
  )
}

export default SideBG