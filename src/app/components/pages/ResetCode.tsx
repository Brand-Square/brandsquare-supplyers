/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/assets/svg/logo.svg";
import Button from "@/app/components/ui/button";
import Input from "../ui/Input";
import { useFormik } from "formik";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Toast from "../ui/ToastContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResetPassword from "./ResetPassword";

const validate = (values: { otpCode: string }) => {
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

const ResetCodePage = () => {
  const { sendOtp, verifyOtp, isLoading } = useInitAuthStore();
  const router = useRouter();

  const [timer, setTimer] = useState(6);
  const [requestCode, SetRequestCode] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="))
      ?.split("=")[1];

    setEmail(email || "");
  }, []);

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
        setTimer(6);
      })
      .catch((error) => {
        toast.error(error.response.data.msg || "Error sending code");
      });
  };

  const formik = useFormik({
    initialValues: {
      otpCode: "",
    },
    validate,
    onSubmit: (values) => {
      verifyOtp({ email, otp: values.otpCode })
        .then((response) => {
          setTimeout(() => {
            router.push("/auth/login");
          }, 1500);
          return response;
        })
        .catch((error) => {
          // Error is already handled by the verifyOtp function with toast
          console.error("OTP verification failed:", error);
          throw error; // Re-throw the error to satisfy TypeScript
        });
    },
  });

  return (
    <div className="   mt-[40px]  px-8 ">
      <div className="  md:hidden  block ">
        <Image
          src="/assets/icons/bransquare-logo.svg"
          alt="Brandsquare Logo"
          width={150}
          height={30}
          className="h-8 w-auto mb-4"
        />
      </div>
      <div className=" mt-[70px]  md:mt-[94px] max-w-[500px]  mx-auto  ">
        <h3 className=" text-center  md:text-left font-bold text-theme-gray text-[30px]">
          Verify account
        </h3>
        <p className="text-center  md:text-left  leading-7 text-gray-500 pt-3 text-[16px]">
          An OTP has been sent to <br /> your mail, please enter the OTP
        </p>

        <form className="my-4 mt-8" onSubmit={formik.handleSubmit}>
          <div>
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
          <div className=" pt-3 text-right text-[#212F72]">
            <span className=" text-theme-gray">
              {" "}
              {timer === 0 ? (
                <span
                  onClick={handleResendCode}
                  className={`  ${
                    !requestCode
                      ? "opacity-30 text-[#212F72]"
                      : "text-[#212F72] cursor-pointer hover:opacity-80"
                  }   `}
                >
                  Resend code
                </span>
              ) : (
                `Request code in: ${timer}s`
              )}{" "}
            </span>
          </div>
          <div className=" mt-14 w-full  md:w-[200px]">
            <Button isLoading={isLoading} text="Verify Account" />
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
};

export default ResetCodePage;
