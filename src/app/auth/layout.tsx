import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className=" authBg bg-white/80  px-4">{children}</div>;
};

export default layout;
