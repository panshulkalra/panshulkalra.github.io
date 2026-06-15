import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100">
    <title>Loader Logo</title>
    <g>
      {/* The Bounding Box */}
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        d="M 5 5 L 395 5 L 395 95 L 5 95 Z"
      />
      {/* Your Name */}
      <text
        x="200"
        y="54"
        fill="currentColor"
        fontSize="26px"
        fontFamily="var(--font-sans)"
        fontWeight="600"
        textAnchor="middle"
        alignmentBaseline="middle"
        letterSpacing="4px"
        opacity="0" 
      >
        Panshul Kalra
      </text>
    </g>
  </svg>
);

export default IconLoader;