import React from "react";

function UsersIcon(props) {
  const comment = props.comment;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={comment?"28":"20"}
      height={comment?"28":"20"}
      fill="#fff"
      viewBox="0 0 24 24"
      style={
        comment
          ? {
            borderRadius: "100%",
            backgroundColor: "#eee",
            padding: "6px",
            marginRight: "10px",
          }
          : {}
      }
    >
      <path
        fillRule="evenodd"
        d="M5 9.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"
        clipRule="evenodd"
        style={comment ? { fill: "#344767" } : {}}
      ></path>
      <path
        d="M14.367 12.063a.197.197 0 00.053.252 3.5 3.5 0 100-5.63.197.197 0 00-.053.252c.404.765.633 1.637.633 2.563 0 .926-.229 1.798-.633 2.563z"
        style={comment ? { fill: "#344767" } : {}}
      ></path>
      <path
        fillRule="evenodd"
        d="M4.641 15.7c1.233-.536 2.85-.7 4.859-.7 2.011 0 3.63.165 4.862.7 1.343.585 2.16 1.58 2.587 2.984A1.02 1.02 0 0115.974 20H3.028a1.02 1.02 0 01-.976-1.319c.428-1.404 1.245-2.398 2.59-2.982z"
        clipRule="evenodd"
        style={comment ? { fill: "#344767" } : {}}
      ></path>
      <path
        style={comment ? { fill: "#344767" } : {}}
        d="M14.819 14.036c-.415.026-.439.582-.058.748 1.042.453 1.827 1.12 2.39 1.972.462.699 1.179 1.244 2.017 1.244h1.78c.707 0 1.224-.703.975-1.39a3.412 3.412 0 00-1.843-2.024c-.816-.38-1.837-.538-3.04-.585L17.02 14H17c-.71 0-1.45-.01-2.181.036z"
      ></path>
    </svg>
  );
}

export default UsersIcon;
