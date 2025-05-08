/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Input from "../ui/Input";
import eyeOpenIcon from "../../../../public/assets/svg/eyeOpen.svg";
import eyeCloseIcon from "../../../../public/assets/svg/eyeClosedIcon.svg";
import Image from "next/image";
import { useFormik } from "formik";
//import { useRouter } from "next/navigation";
import Toast from "../ui/ToastContainer";
import useInitAuthStore from "@/app/store/InitAuthStore";
import ReCAPTCHA from "react-google-recaptcha";

const validate = (values: {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  acceptTerms?: boolean;
  recaptcha?: string;
}) => {
  const errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
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

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "You must accept the terms and conditions";
  }

  if (!values.recaptcha) {
    errors.recaptcha = "Please verify that you are not a robot";
  }

  return errors;
};

const createaccount = () => {
  const {
    register,
    isLoading,
    sendOtp,
    termsAccepted,
    checkTermsAccepted,
    setTermsAccepted,
  } = useInitAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  //const router = useRouter();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: checkTermsAccepted(),
      recaptcha: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      // Check if terms have been accepted
      if (!values.acceptTerms) {
        alert("You must accept the terms and conditions");
        return;
      }

      // Check if reCAPTCHA is completed
      if (!values.recaptcha) {
        alert("Please verify that you are not a robot");
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
          console.log("Registration successful, navigating to verify account");
          sendOtp({ email: values.email });
          // Use toast to show success message
          alert("Account created successfully! Please verify your email.");
          // Force navigation with window.location instead of router.push
          window.location.href = "/auth/verify-account";
        })
        .catch((error) => {
          console.error("Registration error:", error);
          if (error.response?.data?.msg === "Email Already in use") {
            alert("This email is already registered. Please log in instead.");
            formik.setFieldError(
              "email",
              "This email is already registered. Please log in instead."
            );
          } else {
            alert("An error occurred during registration. Please try again.");
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

  // Update acceptTerms when termsAccepted changes in the store
  useEffect(() => {
    if (checkTermsAccepted()) {
      formik.setFieldValue("acceptTerms", true);
    }
  }, [termsAccepted, checkTermsAccepted, formik]);

  // If user manually checks the box, update the global state too
  useEffect(() => {
    if (formik.values.acceptTerms) {
      setTermsAccepted(true);
    }
  }, [formik.values.acceptTerms, setTermsAccepted]);

  const handleRecaptchaChange = (value: string | null) => {
    formik.setFieldValue("recaptcha", value);
  };

  return (
    <div className="w-full full flex items-center justify-center ">
      <div className="   mt-[40px]  px-8 ">
        <div className="  md:hidden  block ">
          <Image
            src="/assets/svg/logo1.svg"
            width={24}
            height={24}
            alt="Logo"
            className="  ml-auto "
          />
        </div>
        <div className="   ">
          <h3 className=" text-center  md:text-left font-bold text-[30px]">
            Create an account
          </h3>
          <p className="text-center  md:text-left text-gray-500 pt-1 text-[16px]">
            Please provide your details below.
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className=" my-6 w-full max-w-md mx-auto"
          >
            <div className=" my-2">
              <Input
                type="text"
                placeholder="e.g Shekinah LTD "
                onChange={formik.handleChange}
                value={formik.values.companyName}
                label="Business Name "
                name="companyName"
              />

              {formik.errors.companyName && formik.touched.companyName && (
                <div className=" text-red-400 text-sm">
                  {formik.errors.companyName}
                </div>
              )}
            </div>
            <div className=" my-2">
              <Input
                type="text"
                placeholder="e.g shekinahLTD@mail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Email"
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
                  className="absolute cursor-pointer  top-[2.7rem] right-3"
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
            </div>

            <div className=" my-2 ">
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="******"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  label="Confirm Password"
                  name="confirmPassword"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute cursor-pointer  top-[2.7rem] right-3"
                >
                  {showConfirmPassword ? (
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
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className=" text-red-400 text-sm">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
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
                <a
                  href="/terms?returnUrl=/auth/create-account"
                  className="text-theme-yellow-pry font-medium"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {formik.errors.acceptTerms && formik.touched.acceptTerms && (
              <div className="text-red-400 text-sm ml-2 mb-4">
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

            <div className=" mt-4 w-full  md:w-[200px]">
              <button
                type="submit"
                className="w-full hover:opacity-85 hover:scale-105 transform transition-all bg-theme-yellow text-theme-black p-3 font-semibold rounded-[10px] text-center"
                disabled={isLoading}
              >
                <div className="flex justify-center items-center gap-1">
                  Create Account
                  {isLoading && (
                    <Image
                      alt="loading"
                      src="/assets/svg/spinner.svg"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </button>
            </div>

            <div>
              <p className="text-center text-[#6A6B72] mt-2">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-theme-yellow-pry font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/auth/login";
                  }}
                >
                  <span className="text-theme-yellow-pry font-bold">
                    Log in
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>

        <Toast />
      </div>
    </div>
  );
};

export default createaccount;
