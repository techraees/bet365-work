import * as React from "react"
import { SVGProps } from "react"

export const TennisFieldHover = (props: SVGProps<SVGSVGElement>) => (

  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={13} {...props}>
    <g fill="none">
      <rect
        width={21}
        height={12}
        x={0.5}
        y={0.5}
        stroke="#FFF"
        rx={1}
        className="fill-[#B36E60]"
      />
      <g fill="#FFF">
        <path d="M10.45.542h1.101v11.916H10.45z" opacity={0.9} />
        <path
          d="M4.95.542h1.101v11.916H4.95zm11 0h1.101v11.916H15.95z"
          opacity={0.5}
        />
      </g>
    </g>
  </svg>
)
export default TennisFieldHover