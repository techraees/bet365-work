import * as React from "react"
import { SVGProps } from "react"

export const BaseballFieldHover = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19}
        viewBox="0 0 19 19" {...props}>
        <g fill="none" fillRule="evenodd" transform="translate(.308 .308)">
            <rect
                width={12}
                height={12}
                x={3.192}
                y={3.192}
                rx={1}
                transform="rotate(45 9.192 9.192)"
                className="stroke-[#ccc] group-hover:fill-[#5E733F] group-hover:stroke-[#FFF] "
            />
            <path
                className="fill-[#FFF] opacity-20 group-hover:fill-[#EB9A67] group-hover:opacity-100"
                d="M9.192 4.692c.908 0 1.735-.352 2.357-.919-.712-.71-1.498-1.497-2.357-2.358a747.605 747.605 0 0 1-2.364 2.358c.623.571 1.453.92 2.364.92zm-.007 9c-.908 0-1.735.353-2.357.92.712.71 1.498 1.496 2.357 2.358a925.398 925.398 0 0 1 2.364-2.359 3.487 3.487 0 0 0-2.364-.919zM4.67 9.2c0-.908-.353-1.735-.92-2.357-.71.712-1.496 1.498-2.358 2.357a925.398 925.398 0 0 1 2.359 2.364c.57-.623.919-1.453.919-2.364zm9.022.007c0 .908.353 1.735.92 2.357.71-.712 1.496-1.497 2.358-2.357a1054.3 1054.3 0 0 1-2.359-2.364 3.487 3.487 0 0 0-.919 2.364z"
            />
        </g>
    </svg>
)
export default BaseballFieldHover


