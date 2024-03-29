import * as React from "react"
import { SVGProps } from "react"

export const CyclingIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15"{...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M12.355 7.15a2.645 2.645 0 1 1-1.607.544l.264.595a2.018 2.018 0 1 0 1.58-.499l-.286-.64h.05zm-9.659 0c.202 0 .399.023.588.066l-.36.573a2.018 2.018 0 1 0 1.419.838l.351-.565a2.645 2.645 0 1 1-1.998-.912z"
      />
      <path
        fill="#2EBCEC"
        fillRule="nonzero"
        d="M5.06 4.853h5.847l1.696 3.771a.5.5 0 0 1-.911.41L10.26 5.852H5.62L3.54 9.26a.5.5 0 0 1-.853-.522L5.06 4.854z"
      />
      <path
        fill="#2EBCEC"
        fillRule="nonzero"
        d="m4.082 3.67.895-.447L7.2 7.67a.5.5 0 1 1-.894.447L4.082 3.67zm6.883-.248.844.536-2.667 4.196a.5.5 0 1 1-.844-.536l2.667-4.196z"
      />
      <circle cx={11.686} cy={3.656} r={1} fill="#2EBCEC" />
      <ellipse cx={3.778} cy={3.223} fill="#FFF" rx={1.292} ry={1} />
      <circle cx={7.71} cy={8.301} r={1.151} fill="#FFF" />
    </g>
  </svg>
)
export default CyclingIcon
