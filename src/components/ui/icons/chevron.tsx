import * as React from "react"
import { SVGProps } from "react"

const Chevron = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={9} viewBox='0 0 14 9' {...props}>
    <path
      fill="%23FFF"
      d="m12 0 1.414 1.414-6.707 6.707L0 1.414 1.414 0l5.293 5.292z"
    />
  </svg>
)
export default Chevron



export const EsportDrop = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7" {...props}>
    <path
      fill="{0}"
      fillRule="evenodd"
      d="M12 .784 11.243 0 6 5.431.757 0 0 .784l5.243 5.432L6 7l.757-.784z"
    />
  </svg>
)