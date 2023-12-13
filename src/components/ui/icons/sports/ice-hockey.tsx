import React from 'react';
import { SVGProps } from "react"

export const IceHockeyIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox='0 0 15 15' {...props}>
        <g fill="none">
            <ellipse cx={7.484} cy={5.729} fill="#509CF2" rx={6.484} ry={2.418} />
            <path
                fill="#000"
                d="M7.484 8.148c3.58 0 6.482-1.083 6.482-2.419l-.09.089c-.547.525-2.206 1.957-6.392 1.957-4.455 0-6.305-1.449-6.484-2.046 0 1.336 2.902 2.419 6.484 2.419z"
                opacity={0.25}
            />
            <path
                fill="#509CF2"
                d="M1.034 6.452c0 1.336 2.902 2.418 6.482 2.418C11.098 8.87 14 7.788 14 6.452v2.882c-.09 1.306-2.959 2.355-6.484 2.355-3.523 0-6.394-1.049-6.482-2.355V6.452z"
            />
            <path
                fill="#000"
                d="M7.79 11.003c5.575-.25 6.21-3.215 6.21-4.551v2.882c-.09 1.306-2.959 2.355-6.484 2.355-3.523 0-6.394-1.049-6.482-2.355.787 1.28 3.04 1.836 6.756 1.669z"
                opacity={0.25}
            />
        </g>
    </svg>
)



