/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import Logo from "../../../../public/assets/svgComponent/Logo";
// import Button from "@/app/components/ui/button";
import Input from "../ui/Input";
import { useFormik } from "formik";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Toast from "../ui/ToastContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthCard from "@/app/auth/components/ui/AuthCard";
import DashBtn from "@/app/auth/components/ui/DashBtn";

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

const VerifyAccount = () => {

  const { sendOtp, verifyOtp, isLoading } = useInitAuthStore();
  const router = useRouter();

  const [timer, setTimer] = useState(60);
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
        setTimer(60);
      })
      .catch((error) => {
        toast.error(error.response.data.msg || "Error sending code");
      });
  };

  const [localPart, domain] = email.split("@");
  const visibleChars = 3;

  const maskedLocalPart =
    localPart.length <= visibleChars
      ? localPart
      : "*".repeat(localPart.length - visibleChars) +
        localPart.slice(-visibleChars) +
        "@" +
        domain;

  const formik = useFormik({
    initialValues: {
      otpCode: "",
    },
    validate,
    onSubmit: (values) => {
      verifyOtp({ email, otp: values.otpCode }).then(() => {
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      });
    },
  });

  
 const maskedEmail = (email: string) => {
   const [local, domain] = email.split("@"); // Split into local part and domain
   return `${local.slice(0, 2)}${"*".repeat( Math.max(0, local.length - 2))}@${domain}`;
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
          <h3 className="text-[24px] font-bold">Verify account</h3>
          <p className="text-[16px] mt-1 text-[#D1E4FF]">
            An OTP has been sent to <br /> {maskedLocalPart}, please enter the
            OTP
          </p>
        </div>


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

          <div className="pt-3 text-right  text-theme-yellow-pry">
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
          <div className=" w-fit  mx-auto mt-5">
            <DashBtn isLoading={isLoading} text="Verify Account" />
          </div>
        </form>

        <Toast />
      </AuthCard>
    </div>
  );
};

export default VerifyAccount;

