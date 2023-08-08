import * as React from "react"
import { SVGProps } from "react"

export const PlayButtonHover = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={13} viewBox="0 0 22 13">
    <g fill="none" fillRule="evenodd">
      <rect
        width={21}
        height={12}
        x={0.5}
        y={0.5}
        fill="#199970"
        stroke="#FFF"
        rx={1}
      />
      <path fill="#FFF" d="M8.8 3.25v6.523l5.239-3.261z" />
    </g>
  </svg>
)


export const PlayButton = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={13}  viewBox="0 0 22 13">
    <g fill="none" fillRule="evenodd">
      <rect width={21} height={12} x={0.5} y={0.5} stroke="#CCC" rx={1} />
      <path fill="#CCC" d="M8.8 3.25v6.523l5.239-3.261z" />
    </g>
  </svg>
)
export default PlayButton