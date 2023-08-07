import React from "react";

const NetballCourt = () => {
  return (
    <svg
      className="w-full"
      viewBox="-10 -10 320 420"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000"
      strokeWidth="4"
      fill="none"
    >
      <rect x="0" y="0" width="300" height="400" rx="4" />
      <circle cx="150" cy="200" r="20" />
      <line x1="0" x2="300" y1="120" y2="120" />
      <line x1="0" x2="300" y1="280" y2="280" />
      <g transform="translate(70,300)">
        <path
          d="M 0 100
           A 50 50 0 0 1 160 100
           L 0 100
           Z"
        />
      </g>
      <g transform="rotate(180, 50, 50) translate(-130,0)">
        <path
          d="M 0 100
           A 50 50 0 0 1 160 100
           L 0 100
           Z"
        />
      </g>
    </svg>
  );
};

export default NetballCourt;
