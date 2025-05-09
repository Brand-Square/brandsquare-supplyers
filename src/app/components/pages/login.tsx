"use client";
import React, { useState } from "react";
import Input from "../ui/Input";
import eyeOpenIcon from "../../../../public/assets/svg/eyeOpen.svg";
import eyeCloseIcon from "../../../../public/assets/svg/eyeClosedIcon.svg";
import Image from "next/image";
import { useFormik } from "formik";

import { useRouter } from "next/navigation";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Toast from "../ui/ToastContainer";

import DashBtn from "@/app/auth/components/ui/DashBtn";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const validate = (values: { email: string; password: string }) => {
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)
  ) {
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
  const { login, isLoading } = useInitAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",

      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log({
        email: values.email,
        password: values.password,
        userType: "supplier",
      });
      login(
        { email: values.email, password: values.password, userType: "supplier" },
        router
      );
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="w-[100%] lg:w-[100%] mx-auto">
        <div className="  w-fit mx-auto mb-7">
          <Image
            src="/assets/icons/bransquare-logo.svg"
            alt="Brandsquare Logo loging logo"
            width={150}
            height={30}
            className="h-8 w-auto mb-4"
          />
        </div>
        <div className="w-[90%] lg:w-[30%] mx-auto">
          <div
            className="text-white text-center
             "
          >
            <h3 className=" text-[24px] font-bold text-[#2A2B2D]">Log in</h3>
            <p className="text-[16px] mt-1 text-[#6A6B72]">
              Please provide your details below.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className=" my-6" action="">
            <div className=" my-6">
              <Label>
                <span className="text-gray-500">Email</span>
              </Label>
              <Input
                type="text"
                placeholder="e.g shekinahLTD@mail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
              />
              {formik.errors.email && formik.touched.email && (
                <div className=" text-red-400 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className=" my-2 ">
              <div className="relative">
                <Label>
                  <span className="text-gray-500">Password</span>
                </Label>
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
              <div
                onClick={() => router.push("/auth/forgot-password")}
                className="pt-3 cursor-pointer text-right  text-theme-yellow-pry font-bold"
              >
                <p>Forgot password?</p>
              </div>
            </div>
            <div className=" w-fit mx-auto mt-7">
              <DashBtn isLoading={isLoading} text="Log In" />
            </div>
          </form>
          <div>
            <p className="text-center text-[#6A6B72] mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/auth/create-account">
                <span className="text-theme-yellow-pry font-bold">
                  Create account
                </span>
              </Link>
            </p>
          </div>
          <Toast />
        </div>
      </div>
    </div>
  );
};

export default Login;
