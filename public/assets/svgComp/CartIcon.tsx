import React from "react";

const CartIcon = ({ color = "#000051" }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 16.5C10 17.329 9.328 18 8.5 18C7.672 18 7 17.329 7 16.5C7 15.672 7.672 15 8.5 15C9.328 15 10 15.672 10 16.5ZM13.5 15C12.672 15 12 15.671 12 16.5C12 17.329 12.672 18 13.5 18C14.328 18 15 17.329 15 16.5C15 15.672 14.328 15 13.5 15ZM19.805 0L16.373 12H5.945L3.008 5H14.17L12.758 10H14.836L16.813 3H0L4.615 14H17.854L21.328 2H23.257L24 0H19.805Z"
        fill={color}
      />
    </svg>
  );
};

export default CartIcon;
