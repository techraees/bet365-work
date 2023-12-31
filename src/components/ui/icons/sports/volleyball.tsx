import * as React from "react"
import { SVGProps } from "react"

export const VolleyballIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={30}
    viewBox="0 0 30 30"
    {...props}
  >
    <defs>
      <path
        id="volleyballA"
        d="m6.194 24.339.07.05c1.16.818 2.576 1.383 3.69.622 2.46 1.362 4.884 2.004 7.29 2.232l.088.008-.261.685c-5.05.6-8.524-1.087-10.877-3.597zm16.037-3.631c-1.12 1.934-3.539 4.679-4.669 6.24l-.065-.006c-1.114-.104-4.557-.654-7.627-2.274-1.243-2.085-.72-4.167.532-6.285 2.512 1.066 8.045-2.427 11.83 2.325zm5.6-3.492c-.386 2.955-1.901 5.78-4.681 8.21-.344.3 2.713-5.256 3.144-6.656.828-.36.972-.722 1.537-1.554zM4.526 13.397c.927 2.737 2.753 4.298 5.613 4.835-1.908 2.629-1.906 4.53-.52 6.593-2.463.956-4.695-1.669-5.74-3.929-1.315-2.842-.987-6.519.647-7.499zm19.468-6.82c3.255 5.3 2.177 9.562-.945 10.017-3.194-4.684-6.336-4.89-7.522-5.061l.094-.128c1.467-2 2.607-3.962 2.751-6.12 1.83-.503 3.79.202 5.622 1.291zm-17.546-.91c-1.873 1.75-2.866 3.69-2.73 5.626-.308.147-.786.547-1.079 1.16.353-2.988 1.758-5.083 3.81-6.785zm5.857-2.301.279.053c2 .39 3.692.828 5.413 1.881-.302 2.413-1.503 4.282-3 6.166-2.99-1.041-7.93 1.751-8.894-2.637 1.924-1.87 3.41-4.054 6.202-5.463zm11.469 2.757c-2.011-1.168-3.494-1.602-5.657-1.146-1.665-.873-3.322-1.467-5.42-1.859 3.41-1.579 7.756-.64 11.077 3.005z"
      />
      <path
        id="volleyballC"
        d="M26.08 18.77c-.947 2.293-2.7 4.883-3.491 7.095-.829.994-4.896 2.31-5.257 1.875 3.296-3.279 5.396-6.822 6.763-8.85l.063.02c.58.187 1.165.24 1.923-.14zM5.93 9.128c1.092 4.252 4.576 2.071 9.009 2.65 2.906.378 6.597 2.166 8.835 6.868l-1.357 1.773c-3.394-4.505-6.856-2.553-10.655-2.393-3.114.131-6.789-1.646-7.428-6.807.101-.7 1.004-1.91 1.596-2.091zm-1.758 2.18c.042.59.185 1.111.354 1.614-1.295.945-2.223 2.343-1.563 6.112-1.243-4.026-.84-6.602 1.209-7.726zm19.8-5.185c5.785 5.332 4.885 13.432.186 12.427l-.82-1.595c3.675-.503 4.426-4.997.634-10.832zM13.038 2.714C10.024 3.76 7.672 6.51 5.846 8.7c-.661.438-1.27 1.053-1.793 2.376-.111-2.053 1.009-3.833 3.128-5.824 1.964-1.736 3.917-2.582 5.857-2.538z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="volleyballB" fill="#fff">
        <use xlinkHref="#volleyballA" />
      </mask>
      <use xlinkHref="#volleyballA" fill="#F8CF3A" />
      <path
        fill="#000"
        d="M7.84 25.92c5.996 4.045 14.135 2.463 18.179-3.533 4.044-5.996 2.462-14.135-3.534-18.18 2.296 2.995 3.832 9.717-.212 15.713-4.044 5.996-10.638 7.693-14.433 6z"
        mask="url(#volleyballB)"
        opacity={0.25}
      />
      <use xlinkHref="#volleyballC" fill="#283A90" />
    </g>
  </svg>
)
export default VolleyballIcon
