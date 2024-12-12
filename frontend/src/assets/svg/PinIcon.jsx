import React from "react";

function PinIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#344767"
      className="pointer"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M12 22a7 7 0 01-7-7v-5a1 1 0 012 0v5a5 5 0 0010 0V7a3 3 0 00-6 0v8a1 1 0 002 0V7a1 1 0 012 0v8a3 3 0 01-6 0V7a5 5 0 0110 0v8a7 7 0 01-7 7z"
      ></path>
    </svg>
  );
}

export default PinIcon;
