import * as React from "react"
import { SVGProps } from "react"


const StarOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} {...props}>
    <title>{"Path Copy"}</title>
    <path
      fill="#333"
      d="m5.5 0 1.699 3.62L11 4.2 8.25 7.019 8.898 11 5.5 9.12 2.1 11l.65-3.981L0 4.199l3.8-.58L5.5 0zm1.2 4.285-1.2-2.56-1.201 2.56-2.777.424 2.012 2.063-.466 2.854L5.5 8.283l2.431 1.344-.464-2.855 2.011-2.063-2.777-.424z"
    />
    <path
      d="M5.5 9.12 2.1 11l.65-3.98L0 4.2l3.8-.58L5.5 0l1.699 3.62L11 4.2 8.25 7.02 8.898 11"
    />
  </svg>
)
export default StarOutlineIcon
