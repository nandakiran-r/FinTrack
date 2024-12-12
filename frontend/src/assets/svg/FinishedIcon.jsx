
function FinishedIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#000"
      className="icon line-color"
      data-name="Line Color"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="rgb(0, 128, 0)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 10.67L11.33 13.33 10 12"
      ></path>
      <path
        fill="none"
        stroke="rgb(0, 128, 0)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 21a1 1 0 001-1V7l-4-4H6a1 1 0 00-1 1v16a1 1 0 001 1z"
      ></path>
    </svg>
  );
}

export default FinishedIcon;
