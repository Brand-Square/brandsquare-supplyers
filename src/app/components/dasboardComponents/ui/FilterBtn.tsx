import React from 'react'
import FilterIcon from '../../../../../public/assets/icons/filterIcon.svg'
import Image from 'next/image'

const FilterBtn = () => {
  return (
    <div>
        <div className='flex items-center gap-2 border  border-theme-text-gray rounded-md cursor-pointer  p-1 md:p-2'>
            <Image width={20} height={20} src={FilterIcon} alt='icon' className=' md:w-5 md:h-5 w-3 h-3' />
                 <span className='text-sm  text-theme-text-gray hidden sm:inline'>Filter <span className=' md:inline hidden'>products by</span></span>
        </div>
    </div>
  )
}

export default FilterBtn