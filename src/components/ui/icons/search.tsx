import * as React from "react"
import { SVGProps } from "react"

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox='0 0 16 18' {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#F0F0F0" d="m10.213 11.85.788-.616 4.31 5.516-.788.616z" />
      <circle cx={6.862} cy={6.6} r={6.1} stroke="#F0F0F0" />
    </g>
  </svg>
)
export default Search
