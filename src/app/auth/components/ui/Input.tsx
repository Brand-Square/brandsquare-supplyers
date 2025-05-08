import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text", // Default type
  value,
  name,
  onChange,
  placeholder = "Enter text here",
  error,
  ...rest
}) => {
  return (
    <div className="input-container">
      {label && (
        <label className=" text-[#EDF4FF] text-[14px] block mb-[0.3rem]">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name} // Ensure this is passed
        onChange={onChange}
        placeholder={placeholder}
        suppressHydrationWarning
        className=" outline-none  bg-[#fff] px-2 placeholder:text-[#98A2B3] border-[#AAAABC] focus:ring-1 focus:ring-[#a4a4b8] text-[#6A6B72] focus:border-transparent"
        style={{
          width: "100%",
          padding: "0.6rem",
          border: "1px solid #ccc",
          borderRadius: "9px",
          fontSize: "1rem",
        }}
        {...rest}
      />
      {error && (
        <small style={{ color: "red", marginTop: ".25rem", display: "block" }}>
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;
