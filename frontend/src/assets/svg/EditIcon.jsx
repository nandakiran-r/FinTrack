import React from 'react'

function EditIcon(props) {
  return (
    <svg
      className="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#344767"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h2m6-16h2a2 2 0 012 2v2M14.902 20.334l-2.187.438.438-2.187a1 1 0 01.273-.511L17.5 14l2-2 1.987 1.987-2 2-4.074 4.074a1 1 0 01-.511.273zM9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"
      ></path>
    </svg>
  )
}

export default EditIcon
