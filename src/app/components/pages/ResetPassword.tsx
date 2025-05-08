/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import eyeOpenIcon from "../../../../public/assets/svg/eyeOpen.svg";
import eyeCloseIcon from "../../../../public/assets/svg/eyeClosedIcon.svg";
import Image from "next/image";
import { useFormik } from "formik";
//import Logo from '../../../../public/assets/svgComponent/Logo'
import useInitAuthStore from "@/app/store/InitAuthStore";
import Toast from "../ui/ToastContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthCard from "@/app/auth/components/ui/AuthCard";
import DashBtn from "@/app/auth/components/ui/DashBtn";

const validate = (values: { password: string; otpCode: string }) => {
  const errors: {
    password?: string;
    otpCode?: string;
  } = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be at least 6 Characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password Invalid";
  }
  if (!values.otpCode) {
    errors.otpCode = "Fill in field";
  } else if (values.otpCode.length > 6 || values.otpCode.length < 4) {
    errors.otpCode = "Must be 6 characters";
  }

  return errors;
};

const resetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { ResetPassword, isLoading, sendOtp } = useInitAuthStore();
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60);
  const [requestCode, SetRequestCode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="))
      ?.split("=")[1];

    setEmail(email || "");
  }, []);
  const formik = useFormik({
    initialValues: {
      password: "",
      otpCode: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      ResetPassword({
        email,
        newPassword: values.password,
        otp: values.otpCode,
      }).then(() => {
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      });
    },
  });
  useEffect(() => {
    if (timer > 0) {
      const time = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(time);
    } else {
      SetRequestCode(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    console.log("resend code");
    sendOtp({ email })
      .then(() => {
        toast.success("Code sent successfully");

        SetRequestCode(false);
        setTimer(60);
      })
      .catch((error) => {
        toast.error(error.response.data.msg || "Error sending code");
      });
  };

  return (
    <div className="translate-y-[10%] ">
      <div className="  w-fit mx-auto mb-7">
        <Image
          src="/assets/icons/bransquare-logo.svg"
          alt="Brandsquare Logo"
          width={150}
          height={30}
          className="h-8 w-auto mb-4"
        />
      </div>
      <AuthCard>
        <div
          className="text-white text-center
             "
        >
          <h3 className="text-[24px] font-bold">Reset password</h3>
          <p className="text-[16px] mt-1 text-[#D1E4FF]">
            Enter otp code and new password
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className=" my-6" action="">
          <div className=" my-2 ">
            <div className=" mb-7">
              <Input
                type="text"
                placeholder="1234 "
                onChange={formik.handleChange}
                value={formik.values.otpCode}
                label="OTP "
                name="otpCode"
              />
              {formik.errors.otpCode && formik.touched.otpCode && (
                <div className=" text-red-400 text-sm">
                  {formik.errors.otpCode}
                </div>
              )}
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
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
            <div className=" pt-3 text-right  text-theme-yellow-pry">
              <span className="  ">
                {" "}
                {timer === 0 ? (
                  <span
                    onClick={handleResendCode}
                    className={`  ${
                      !requestCode
                        ? "opacity-30 text-theme-yellow-pry"
                        : "text-theme-yellow-pry cursor-pointer hover:opacity-80"
                    }   `}
                  >
                    Resend code
                  </span>
                ) : (
                  `Request code in: ${timer}s`
                )}{" "}
              </span>
            </div>
          </div>
          <div className=" w-fit mx-auto">
            <DashBtn isLoading={isLoading} text="Save password" />
          </div>
        </form>
        <Toast />
      </AuthCard>
    </div>
  );
};

export default resetPassword;
