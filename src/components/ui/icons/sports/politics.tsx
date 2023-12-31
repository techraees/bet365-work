import React from 'react';
import { SVGProps } from "react"

export const PoliticsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox='0 0 15 15' {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#F2C59D"
          fillRule="nonzero"
          d="m4.242 2.945-.422.38.522.543h-.855l-1.275 1.79h10.576l-1.358-1.79h-.964l.93-.837-.077-.086h.937l2.459 3.239H.285l2.459-3.239z"
        />
        <path fill="#F2C59D" d="M.285 6.184h14.431v1.794H.285z" />
        <path
          fill="#FFF"
          d="m7.952.204 2.585 2.87-2.201 1.982H6.085l-1.622-1.71z"
        />
        <path
          fill="#E81A24"
          d="m7.76 2.923.153-.007c.845-.04 1.483-.1 1.488.026.005.137-.722.274-1.653.318a5.866 5.866 0 0 1-.317 1.652 19.216 19.216 0 0 1-.019-1.641 5.862 5.862 0 0 1-1.661-.201c.502-.065 1.06-.11 1.672-.134l.005-.227c.018-.828.005-1.45.13-1.446.136.004.222.733.202 1.66z"
        />
        <path fill="#F2C59D" d="M.644 8.742h13.711v5.717H.644z" />
      </g>
    </svg>
  )