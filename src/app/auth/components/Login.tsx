"use client";
import React, { useState } from "react";
import AuthCard from "./ui/AuthCard";
import Logo from "../../../../public/assets/svgComponent/Logo";
import DashBtn from "./ui/DashBtn";
import Input from "./ui/Input";
import { useFormik } from "formik";
import Image from "next/image";
import eyeOpenIcon from "../../../../public/assets/svg/eyeOpen.svg";
import eyeCloseIcon from "../../../../public/assets/svg/eyeClosedIcon.svg";
import { Label } from "@/components/ui/label";


const validate = (values: { email: string; password: string }) => {
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be at least 6 Characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password Invalid";
  }

  return errors;
};


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
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
          <h1 className="text-[24px] font-bold  ">Set password</h1>
          <p className="  text-[16px] mt-1 text-[#D1E4FF]">
            Enter your new Brandsquare password
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className=" my-3" action="">
          <div className=" my-2">
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
          <div className=" my-1 ">
            <div className="relative">
              <Label className="text-gray-500">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer  top-[55%] right-3"
              >
                {showPassword ? (
                  <Image
                    className=" h-4 w-4"
                    src={eyeOpenIcon}
                    alt="Eye Icon"
                  />
                ) : (
                  <Image
                    className=" h-4 w-4"
                    src={eyeCloseIcon}
                    alt="Eye Icon"
                  />
                )}
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className=" text-red-400 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className=" pt-3 cursor-pointer text-right  text-theme-yellow-pry font-bold">
              <p>Forgot password?</p>
            </div>
          </div>
          <div className="  w-fit mx-auto py-9  ">
            <DashBtn text="Log In" />
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
