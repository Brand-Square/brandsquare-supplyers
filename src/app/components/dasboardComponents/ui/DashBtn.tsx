//  import Image from 'next/image';
// import React from 'react'
// interface DashBtnProps {
//     styling?: string;
//     icon?: string;
//     text?: string;
//     onClick?: () => void;

// }

// const DashBtn:React.FC<DashBtnProps> = ({ styling, icon, text, onClick}) => {
//   return (
//     <div className={`  w-full hover:opacity-85  hover:scale-105 transform transition-all  p-2  sm:px-3 sm:py-2  whitespace-nowrap font-semibold rounded-[10px]  text-[12px] sm:text-[13px]  flex items-center cursor-pointer gap-1 justify-center  text-center ${styling}`} onClick={onClick}> 
//      {icon && <Image width={20} height={20} src={icon} alt='icon' className=' md:w-5 md:h-5 w-3 h-3' />}
//       {text}
//     </div>
//   )
// }

// export default DashBtn


import Image from 'next/image';
import React from 'react'
import spinner from '../../../../../public/assets/svg/white-spinner.svg'
interface DashBtnProps {
  styling?: string;
  icon?: string;
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;

}

const DashBtn: React.FC<DashBtnProps> = ({ styling, icon, text, onClick, isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`
    ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
    w-max px-3 py-1.5 text-sm font-medium rounded-[10px] bg-theme-blue text-white
    hover:opacity-85 hover:scale-105 transform transition-all duration-300 ease-in-out
    flex items-center justify-center gap-1.5
    sm:px-6 sm:py-2 sm:text-base
    focus:outline-none focus:ring-2 focus:ring-theme-blue focus:ring-offset-2
    ${styling}
  `}
      onClick={onClick}
    >
      {icon && (
        <Image
          width={16}
          height={16}
          src={icon}
          alt="icon"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
      )}
      <div className="flex justify-center items-center gap-1.5">
        {text}
        {isLoading && (
          <Image
            width={16}
            height={16}
            alt="loading"
            src={spinner}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        )}
      </div>
    </button>
  )
}

export default DashBtn