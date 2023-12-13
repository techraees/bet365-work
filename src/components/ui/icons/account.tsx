import * as React from "react"
import { SVGProps } from "react"

export const Account = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" {...props}>
    <g fill="none" fillRule="evenodd" stroke="#FFF" transform="translate(1 1)">
      <path d="M3.903 26.472C6.33 22.46 10.839 20 16 20c5.16 0 9.67 2.459 12.097 6.472A15.963 15.963 0 0 1 16 32a15.963 15.963 0 0 1-12.097-5.528z" />
      <circle cx={16} cy={16} r={16} />
      <path d="M16 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
    </g>
  </svg>
)
export default Account


export const Deposit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" {...props}>
    <path
      fill="#404040"
      d="M4.586 7.802 6 9.212l1.414-1.41-.003-.003 3.271-3.278-1.414-1.41L7 5.383V0H5l.002 5.385-2.27-2.274-1.414 1.41L4.588 7.8l-.002.003zM12 13v-1.995H0V13h12z"
    />
  </svg>
)