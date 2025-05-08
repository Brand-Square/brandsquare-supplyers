/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import AuthCard from './ui/AuthCard'
import Logo from '../../../../public/assets/svgComponent/Logo'
import DashBtn from './ui/DashBtn'
import Input from './ui/Input'
import { useFormik } from 'formik'
const validate = (values: {otpCode: string; }) => {
  const errors: {
    otpCode?: string;
     } = {};
   

     if (!values.otpCode) {
      errors.otpCode = "Fill in field";
    } else if (values.otpCode.length > 6 || values.otpCode.length < 4) {
      errors.otpCode = "Must be 6 characters";
    }
   

  return errors;
};

const VerifyAccount = () => {
  const [timer, setTimer] = useState(60);
    const [requestCode, SetRequestCode] = useState(false);
  const formik = useFormik({
    initialValues: {
        otpCode:'',
    },
    validate,
    onSubmit: values => {
        console.log(values);}
})

const handleResendCode = () => {
  console.log('resend code')
}
  return (
    <div className='translate-y-[10%] '> 
      <div className='  w-fit mx-auto mb-7'>
      <Logo />
      </div>
        <AuthCard >
        <div className='text-white text-center
             '>
                <h1 className='text-[24px] font-bold  '>Verify Account</h1>
                <p className='  text-[16px] mt-1 text-[#D1E4FF]'>An OTP has been sent to <br /> { `masked`}, please enter the OTP</p>
             </div>

             <form className='my-4 mt-8' onSubmit={formik.handleSubmit}  >
            <div>
            <Input type='text' placeholder='1234' onChange={formik.handleChange} value={formik.values.otpCode} name='otpCode' label='Otp' />
            {formik.errors.otpCode && formik.touched.otpCode &&
            <div className=" text-red-400 text-sm">
            {formik.errors.otpCode}
          </div>
            }
            </div>
            <div className=' pt-3 text-right  text-theme-yellow-pry'>
            <span className="  ">
            {" "}
            {timer === 0 ? <span
               onClick={handleResendCode}
              className={`  ${!requestCode ? 'opacity-30 text-theme-yellow-pry' : 'text-theme-yellow-pry cursor-pointer hover:opacity-80'}   `}
            >
              Resend code
            </span> : `Request code in: ${timer}s`}{" "}

             
          </span>
            </div>
            <div className=' mt-14 w-fit mx-auto  '> 
            <DashBtn  text='Verify Account' />
            </div>
        </form>

          </AuthCard>
           </div>
  )
}

export default VerifyAccount