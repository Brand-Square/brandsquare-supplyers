"use client";
import React, { useState, useRef } from "react";
import AuthCard from "./ui/AuthCard";
import Input from "./ui/Input";
import DashBtn from "./ui/DashBtn";
import { useFormik } from "formik";
//import Logo from "../../../../public/assets/svgComponent/Logo";
import eyeOpenIcon from "../../../../public/assets/svg/eyeOpen.svg";
import eyeCloseIcon from "../../../../public/assets/svg/eyeClosedIcon.svg";
import Image from "next/image";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Toast from "@/app/components/ui/ToastContainer";
import { Label } from "@/components/ui/label";
import ReCAPTCHA from "react-google-recaptcha";

const validate = (values: {
  email: string;
  password: string;
  companyName: string;
  acceptTerms?: boolean;
  recaptcha?: string;
}) => {
  const errors: {
    email?: string;
    password?: string;
    companyName?: string;
    acceptTerms?: string;
    recaptcha?: string;
  } = {};
  if (!values.companyName) {
    errors.companyName = "Required";
  } else if (values.companyName.length > 70) {
    errors.companyName = "Must be 70 characters or less";
  }

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

  if (!values.acceptTerms) {
    errors.acceptTerms = "You must accept the terms and conditions";
  }

  if (!values.recaptcha) {
    errors.recaptcha = "Please verify that you are not a robot";
  }

  return errors;
};

const CreateAccount = () => {
  const { register, isLoading, sendOtp } = useInitAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      acceptTerms: false,
      recaptcha: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      // Check if terms have been accepted
      if (!values.acceptTerms) {
        toast.error("You must accept the terms and conditions");
        return;
      }

      // Check if reCAPTCHA is completed
      if (!values.recaptcha) {
        toast.error("Please verify that you are not a robot");
        return;
      }

      register({
        businessName: values.companyName,
        email: values.email,
        password: values.password,
        userType: "vendor",
        acceptedTOS: values.acceptTerms,
      })
        .then(() => {
          sendOtp({ email: values.email });
          toast.success(
            "Account created successfully! Please verify your email."
          );
          router.push("/auth/verify-account");
        })
        .catch((error) => {
          if (error.response?.data?.msg === "Email Already in use") {
            toast.error(
              "This email is already registered. Please log in instead."
            );
            formik.setFieldError(
              "email",
              "This email is already registered. Please log in instead."
            );
          } else {
            toast.error(
              "An error occurred during registration. Please try again."
            );
            formik.setFieldError(
              "email",
              "An error occurred during registration. Please try again."
            );
          }
          // Reset reCAPTCHA on error
          recaptchaRef.current?.reset();
          formik.setFieldValue("recaptcha", "");
        });
    },
  });

  const handleRecaptchaChange = (value: string | null) => {
    formik.setFieldValue("recaptcha", value);
  };

  return (
    <div className="translate-y-[10%] ">
      <div className="  w-fit mx-auto mb-7">
        <Image
          src="/assets/icons/bransquare-logo.svg"
          alt="Brandsquare Logo"
          width={130}
          height={30}
          className="h-full w-full"
        />
      </div>
      <AuthCard>
        <div
          className="text-white text-center
             "
        >
          <h1 className="text-[24px] font-bold text-[#2A2B2D] ">
            Create Account
          </h1>
          <p className="  text-[16px] mt-1 text-[#6A6B72]">
            Please provide your details below.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="my-7" action="">
          <div>
            <Label className="text-gray-500">Business Name</Label>
            <Input
              onChange={formik.handleChange}
              placeholder="Shekinah LTD"
              type="text"
              name="companyName"
              value={formik.values.companyName}
            />
            {formik.errors.companyName && formik.touched.companyName && (
              <div className=" text-red-400 text-sm">
                {formik.errors.companyName}
              </div>
            )}
          </div>
          <div className=" my-3">
            <Label className="text-gray-500">Email</Label>
            <Input
              placeholder="Shekinah@LTD.com"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div className=" text-red-400 text-sm">{formik.errors.email}</div>
            )}
          </div>
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
                <Image className=" h-4 w-4" src={eyeOpenIcon} alt="Eye Icon" />
              ) : (
                <Image className=" h-4 w-4" src={eyeCloseIcon} alt="Eye Icon" />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className=" text-red-400 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="my-4 flex items-start space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formik.values.acceptTerms}
              onChange={formik.handleChange}
              className="mt-1"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600">
              I accept the{" "}
              <Link href="/terms" className="text-theme-yellow-pry font-medium">
                Terms and Conditions
              </Link>
            </label>
          </div>
          {formik.errors.acceptTerms && formik.touched.acceptTerms && (
            <div className="text-red-400 text-sm">
              {formik.errors.acceptTerms}
            </div>
          )}

          <div className="my-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LcpLRcrAAAAAEbVd_stKt33tX6V2xMq4QVDRDLR" // Replace with your actual site key
              onChange={handleRecaptchaChange}
            />
            {formik.errors.recaptcha && formik.touched.recaptcha && (
              <div className="text-red-400 text-sm">
                {formik.errors.recaptcha}
              </div>
            )}
          </div>

          <div className=" mt-6   w-fit mx-auto">
            <DashBtn isLoading={isLoading} text="Create account" />
          </div>
        </form>
      </AuthCard>
      <div>
        <p className="text-center text-[#6A6B72] mt-2">
          Already have an account?{" "}
          <Link href="/auth/login">
            <span className="text-theme-yellow-pry font-bold">Log in</span>
          </Link>
        </p>
      </div>
      <Toast />
    </div>
  );
};

export default CreateAccount;
