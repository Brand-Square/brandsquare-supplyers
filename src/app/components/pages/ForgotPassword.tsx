/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React from "react";
import Input from "../ui/Input";
import { useFormik } from "formik";
import Logo from "../../../../public/assets/svgComponent/Logo";
import { useRouter } from "next/navigation";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Toast from "../ui/ToastContainer";
import AuthCard from "@/app/auth/components/ui/AuthCard";
import DashBtn from "@/app/auth/components/ui/DashBtn";
import { Label } from "@/components/ui/label";

const validate = (values: { email: string }) => {
  const errors: {
    email?: string;
  } = {};


  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};


const createaccount = () => {
  const { forgotPassword, isLoading } = useInitAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      forgotPassword({ email: values.email }).then(() => {
        setTimeout(() => {
          router.push("/auth/reset-password");
        }, 1000);
      });
    },

  });
  return (

    <div className="translate-y-[10%] ">
      <div className="  w-fit mx-auto mb-7">
        <Logo />
      </div>
      <AuthCard>
        <div
          className="text-white text-center
             "
        >
          <h3 className="text-[24px] font-bold">Forgot password</h3>
          <p className="text-[16px] mt-1 text-[#D1E4FF]">
            Enter your mail and an OTP would be sent to verify it
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" my-6" action="">
          <div className=" my-6">
            <Label className="text-gray-500">Email</Label>
            <Input
              type="text"
              placeholder="e.g shekinahLTD@mail.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className=" text-red-400 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className=" my-2 "></div>
          <div className=" w-fit  mx-auto">
            <DashBtn isLoading={isLoading} text="submit" />
          </div>
        </form>
        <Toast />
      </AuthCard>
    </div>
  );
};

export default createaccount;

