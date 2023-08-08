import * as React from "react"
import { SVGProps } from "react"


const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={30}
    viewBox='0 0 30 30'
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M13 21.558 4.965 26 6.5 16.59 0 9.927l8.982-1.372L12.999 0l4.016 8.555L26 9.927l-6.499 6.663L21.029 26"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(2 2)">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <use xlinkHref="#a" fill="#FFDF1B" fillRule="nonzero" />
      <path
        fill="#181818"
        fillRule="nonzero"
        d="M4.965 26C-1.59 37.475 32.792 38.816 26 9.927 25.97 9.801 11.52 14.525 4.965 26z"
        mask="url(#b)"
        opacity={0.25}
      />
    </g>
  </svg>
)
export default StarIcon
