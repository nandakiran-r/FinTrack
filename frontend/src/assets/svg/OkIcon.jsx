import React from "react";

function OkIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 100 100"
            {...props}
        >
            <path
                fill="#506E7D"
                stroke="#174B63"
                strokeWidth="3"
                d="M97 3H60v45h15c7 0 19-11 22-45z"
            ></path>
            <path
                fill="#749DAF"
                stroke="#174B63"
                strokeWidth="3"
                d="M97 3v60s1 11-10 11H40v21L4 55l36-39v21h35C93 37 97 9 97 3z"
            ></path>
        </svg>
    );
}

export default OkIcon;
