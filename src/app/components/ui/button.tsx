import Image from 'next/image';
import React from 'react'
 import spinner from '../../../../public/assets/svg/spinner.svg'
interface FormButtonProps {
    onClick?: () => void;
    text: string;
    icon?: string;
    isLoading?: boolean;
 }

const FormButton:React.FC<FormButtonProps> = ({onClick , text,  isLoading}) => {
   return (
   <button disabled={isLoading} suppressHydrationWarning aria-busy={isLoading} type='submit' className={`   w-full hover:opacity-85  hover:scale-105 transform transition-all    bg-theme-yellow  text-theme-black p-3  font-semibold rounded-[10px]   text-center`} onClick={onClick}>
    <div className='flex justify-center items-center gap-1'>{text} 
          { isLoading &&  <Image alt='loading' src={spinner} /> }
    </div>
          
        </button>  
  )
}

export default FormButton