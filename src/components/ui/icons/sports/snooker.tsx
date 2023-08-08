import React from 'react';
import { SVGProps } from "react"

export const SnookerIcon= (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox='0 0 15 15' {...props}>
    <defs>
      <path
        id="a"
        d="M3.642 1.829a2.062 2.062 0 0 0-.619 1.637 1.911 1.911 0 1 1 .475-2.62 2.094 2.094 0 0 0 .122.925l.022.058z"
      />
      <path
        id="b"
        d="M3.582 1.993a2.06 2.06 0 0 0-.527.915 2.068 2.068 0 0 0-2.933-.301A1.911 1.911 0 0 1 3.45.8a2.08 2.08 0 0 0 .109 1.135l.023.057z"
      />
      <path
        id="d"
        d="M10.31 3.271a1.911 1.911 0 1 1 3.176.603 2.068 2.068 0 0 0-3.176-.603z"
      />
      <path
        id="f"
        d="M0 1.54a1.912 1.912 0 1 1 3.406 1.516A2.432 2.432 0 0 0 .29 2.258 2.055 2.055 0 0 0 0 1.541z"
      />
      <path
        id="g"
        d="M3.795 1.605a1.912 1.912 0 1 0-1.186 2.106v-.015c0-.888.475-1.665 1.186-2.09z"
      />
      <circle id="c" cx={2.129} cy={2.129} r={2.129} />
      <circle id="h" cx={7.203} cy={11.934} r={2.406} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#0E0D12"
        d="M3.406 6.81a2.406 2.406 0 0 1 2.396 2.64 2.408 2.408 0 0 0-1.333 1.928A2.406 2.406 0 1 1 3.407 6.81z"
      />
      <use xlinkHref="#a" fill="#DF0411" transform="translate(2.35 2.504)" />
      <use xlinkHref="#b" fill="#DF0411" transform="translate(6.267 1.362)" />
      <use xlinkHref="#c" fill="#DF0411" transform="translate(8.891 5.724)" />
      <mask id="e" fill="#fff">
        <use xlinkHref="#d" />
      </mask>
      <use xlinkHref="#d" fill="#DF0411" />
      <path
        fill="#751A1A"
        d="M9.66 5.575a2.433 2.433 0 0 0-1.185 2.106A1.911 1.911 0 1 1 9.66 5.576z"
        mask="url(#e)"
      />
      <use xlinkHref="#f" fill="#DF0411" transform="translate(9.514 3.237)" />
      <use xlinkHref="#g" fill="#DF0411" transform="translate(5.866 3.97)" />
      <use xlinkHref="#h" fill="#FDFDF1" />
    </g>
  </svg>
)