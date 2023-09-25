import * as React from "react"
const Close = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={14} cy={14} r={14} fill="#324642" />
      <path
        fill="#FFF"
        d="m14.743 13.943 5.144-5.193-.743-.75L14 13.193 8.856 8l-.743.75 5.144 5.193L8 19.25l.743.75L14 14.693 19.257 20l.743-.75z"
      />
    </g>
  </svg>
)
export default Close

export const NavClose = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FFF"
        d="m14.743 13.943 5.144-5.193-.743-.75L14 13.193 8.856 8l-.743.75 5.144 5.193L8 19.25l.743.75L14 14.693 19.257 20l.743-.75z"
      />
    </g>
  </svg>
)

export const BetClose = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" {...props}>
    <g fill="#545454" fillRule="evenodd">
      <path
        fill="#545454"
        d="m14.743 13.943 5.144-5.193-.743-.75L14 13.193 8.856 8l-.743.75 5.144 5.193L8 19.25l.743.75L14 14.693 19.257 20l.743-.75z"
      />
    </g>
  </svg>
)