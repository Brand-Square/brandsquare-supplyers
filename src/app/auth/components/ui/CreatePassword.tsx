'use client'
import React, { useState } from 'react'
import eyeOpenIcon from  '../../../../../public/assets/svg/eyeOpen.svg'
import eyeCloseIcon from '../../../../../public/assets/svg/eyeClosedIcon.svg'
import Logo from '../../../../../public/assets/svgComponent/Logo'
import AuthCard from './AuthCard'
import {  useFormik } from 'formik'
import DashBtn from './DashBtn'
import Input from './Input'
import Image from 'next/image'
const validate = (values: { password: string; confirmPassword:string }) => {
    const errors: {
       password?: string;
       confirmPassword?: string;
       } = {};
     
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be at least 6 Characters";
    } else if (values.password.includes(" ")) {
      errors.password = "Password Invalid";
    }
    
    if (values.confirmPassword !== values.password) {
      errors.password = "Password does not match";
    } else if (!values.password) {
      errors.password = "Required";
    } else if (values.password.includes(" ")) {
      errors.password = "Password Invalid";
    }
    
     
  
    return errors;
  };

const CreatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
          password: "",
          confirmPassword: "",

         },
        validate,
        onSubmit: values => {
          console.log(values);
           
        }
      });
  return (
    <div className='translate-y-[10%] '> 
    <div className='  w-fit mx-auto mb-7'>
    <Logo />
    </div>
      <AuthCard >
      <div className='text-white text-center
           '>
              <h1 className='text-[24px] font-bold  '>Set password</h1>
              <p className='  text-[16px] mt-1 text-[#D1E4FF]'>Enter your new Brandsquare password</p>
           </div>

           <form onSubmit={formik.handleSubmit} className='my-5' action="">
           <div className=' my-2 '>
             
           <div className='relative mb-5'>
                <Input type={showPassword ? 'text' : 'password'} placeholder='******' onChange={formik.handleChange} value={formik.values.confirmPassword} label='New Password'  name='confirmPassword' />
                <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer  top-[55%] right-3"
          >
                 
            {showPassword ? (
              <Image className=" h-4 w-4" src={eyeOpenIcon} alt="Eye Icon" />
            ) : (
              <Image className=" h-4 w-4" src={eyeCloseIcon} alt="Eye Icon" />
            )}
             </div>
             {formik.errors.password && formik.touched.password && 
                <div className=" text-red-400 text-sm">
                {formik.errors.password}
              </div>}
          </div>
          
           <div className='relative mb-7'>
                <Input type={showConfirmPassword ? 'text' : 'password'} placeholder='******' onChange={formik.handleChange} value={formik.values.password} label='Re-enter Password'  name='password' />
                <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute cursor-pointer  top-[55%] right-3"
          >
                 
            {showConfirmPassword ? (
              <Image className=" h-4 w-4" src={eyeOpenIcon} alt="Eye Icon" />
            ) : (
              <Image className=" h-4 w-4" src={eyeCloseIcon} alt="Eye Icon" />
            )}
             </div>
             {formik.errors.password && formik.touched.password && 
                <div className=" text-red-400 text-sm">
                {formik.errors.password}
              </div>}
          </div>
          
            </div>

<div className=' w-fit mx-auto'>
<DashBtn text='Set Password' />

</div>

            </form>

           </AuthCard >

      
    </div>
  )
}

export default CreatePassword