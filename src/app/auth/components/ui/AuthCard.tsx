import React from "react";

const AuthCard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className=" max-w-[425px]   rounded-[20px] py-10 px-8 mx-auto     max-h-[474px]">
      {children}
    </div>
  );
};

export default AuthCard;
