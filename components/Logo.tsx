import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-label="Daniel Gusmão Campos Logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* A geometric and abstract monogram for DGC. */}
    
    {/* The 'D' is formed by the left-hand structure. */}
    <path d="M 7 4 V 28" />
    <path d="M 7 4 L 20 4" />
    <path d="M 7 28 L 20 28" />
    
    {/* The 'C' is the chevron on the right. */}
    <path d="M 20 4 L 28 16 L 20 28" />

    {/* The horizontal bar as an arrow, creating the 'G' from the 'C' and pointing outwards. */}
    <path d="M 16 16 H 32 L 28 10 M 32 16 L 28 22" />
  </svg>
);

export default Logo;
