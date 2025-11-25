import React from 'react';

export const Co2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 16H9" />
    <path d="M10 12H9" />
    <path d="M14 12H9" />
    <path d="M10 8H9" />
    <path d="M13.5 8C14.328 8 15 8.672 15 9.5V14.5C15 15.328 14.328 16 13.5 16H10" />
    <path d="M6 16V8h2.5C9.88 8 11 9.12 11 10.5V10.5C11 11.88 9.88 13 8.5 13H6" />
    <circle cx="18" cy="10" r="2" />
    <circle cx="18" cy="14" r="2" />
  </svg>
);
