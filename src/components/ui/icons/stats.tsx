import * as React from "react"
import { SVGProps } from "react"

const StatsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} {...props} viewBox='0 0 12 12'>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M10 3h2v9h-2zM0 7h2v5H0zm5-7h2v12H5z"
    />
  </svg>
)
export default StatsIcon
