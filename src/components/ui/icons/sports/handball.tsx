import * as React from "react";
import { SVGProps } from "react";

export const HandballIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 30 30"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#F67E2F"
        d="M12.745 2.202a13.067 13.067 0 0 1 2.242-.192c2.41 0 4.668.657 6.603 1.802l-.29.624c-1.603-.464-3.348-.583-4.695-.292-1.103-.594-2.202-.895-4.195-1.248.058-.205.22-.535.322-.675l.013-.019zm3.67 2.054c-.275 1.065-.309 1.753-.24 3.09l.002.03c.022.41.03.603.033.838-1.611.646-3.035 1.525-4.708 2.822l-.065-.038c-1.298-.762-2.396-1.103-4.303-1.445-.073-.92-.052-1.68.048-2.35.074-.492.171-.862.35-1.405h.005v-.014l.01-.028c1.509-1.143 3.152-2.085 4.717-2.692 2.014.353 3.072.62 4.151 1.192zm-9.468 5.35a10.124 10.124 0 0 0-1.596 2.19c-.334.61-.548 1.096-.99 2.185l-.122.301-.04.005c-.44.05-.667.077-.927.119-.465.074-.87.17-1.267.31A12.935 12.935 0 0 1 5.369 6.27l.001.003.086-.042a3.999 3.999 0 0 1 1.877-.437 7.784 7.784 0 0 0-.34 1.38c-.103.692-.124 1.479-.046 2.428v.003zM7.41 23.47c1.246.953 2.774 1.872 4.713 2.872.086.501.216.958.392 1.402a12.968 12.968 0 0 1-7.174-4.058 6.19 6.19 0 0 0 2.017-.203l.052-.013zm-.193-4.692c1.877-.442 3.114-.903 4.332-1.698 1.177.934 2.426 1.632 4.635 2.684-.15 1.615-.086 3.117.215 4.533l.01.047c-.985.752-2.255 1.283-4.174 1.84-1.974-1.015-4.233-2.498-4.79-2.907-.506-1.954-.319-3.372-.24-4.357l.012-.142zm4.241-1.942-.017.01c-1.21.797-2.44 1.254-4.337 1.697-1.311-1.308-2.18-2.67-2.614-4.2l.108-.266c.438-1.081.65-1.56.977-2.16.42-.77.91-1.453 1.534-2.11 1.868.336 2.937.668 4.2 1.41l.026.015.123 5.604zm4.985 2.898c1.44-.93 3.009-1.85 4.71-2.765l.022.013c1.05.646 2.024 1.568 3.02 2.875-.68 1.907-1.57 3.376-2.764 4.455l-.058.014c-1.668.395-3.24.356-4.74-.152-.286-1.385-.343-2.856-.19-4.44zm5.078 4.772c1.243-1.115 2.177-2.669 2.874-4.642 1.145-.636 2.082-1.393 2.821-2.312.12.394.185.782.212 1.175a13.016 13.016 0 0 1-5.693 7.364 5.24 5.24 0 0 1-.028-.44 3.79 3.79 0 0 0-.186-1.145zm6.044-6.274a5.233 5.233 0 0 0-.208-.866l.002-.02c.23-2.026.214-3.867-.087-5.633l.193-.326c.33 1.146.507 2.356.507 3.607 0 1.118-.14 2.203-.407 3.238zm-.353-6.789-.126.023c-.9-1.255-1.834-2.139-2.805-2.646a9.33 9.33 0 0 0-2.822-4.272l.296-.637a13.018 13.018 0 0 1 5.636 7.23l-.18.302zM21.249 4.62l.03.026a9.125 9.125 0 0 1 2.801 4.178c-.68.79-1.52 1.388-2.859 2.124-1.76-.859-3.352-1.766-4.821-2.764-.003-.226-.012-.42-.032-.818l-.002-.03c-.067-1.302-.036-1.973.224-2.993 1.32-.3 3.062-.186 4.659.277z"
      />
      <path
        fill="#FFF"
        d="M11.525 11.26c1.684-1.352 3.273-2.247 4.81-2.893a35.541 35.541 0 0 0 4.794 2.747v5.579c-1.626.88-3.257 1.807-4.905 2.88-2.055-.93-3.478-1.807-4.574-2.655l-.125-5.659zm-9.523 3.656c.65-.245 1.832-.436 2.262-.442l.027.092c.282.925.973 2.566 2.732 4.257l-.026.266c-.126 1.335-.14 2.706.28 4.22-.872.234-1.567.209-2.107.178-1.786-1.925-3.23-5.326-3.168-8.57zM12.488 2.25l-.08.15c-.067.13-.155.317-.188.476l-.144.057c-.937.377-2.643 1.153-4.642 2.672-.718-.014-1.284.116-1.727.307l.1-.1c1.185-1.177 3.282-2.898 6.681-3.562zm.246 25.535-.092-.238a6.535 6.535 0 0 1-.329-1.19l.094-.03c.683-.207 2.828-.775 4.2-1.897 1.23.416 2.798.604 4.74.162.185.41.179 1.302.208 1.605-2.68 1.545-5.715 2.139-8.82 1.588zm8.586-16.671c1.07-.545 2.08-1.26 2.875-2.125 1.122.572 2.283 1.889 2.9 2.822.303 1.87.243 3.687.077 5.488l-.106.128c-.513.616-1.31 1.47-2.753 2.268l-.159-.203c-1.064-1.35-1.79-1.95-2.835-2.644v-5.734z"
      />
      <path
        fill="#000"
        d="M4.645 22.82c4.315 5.726 12.457 6.87 18.184 2.555 5.727-4.316 6.871-12.457 2.556-18.185 1.488 6.174.169 11.102-5.559 15.417-5.727 4.316-12.882 2.269-15.181.212z"
        opacity={0.25}
      />
    </g>
  </svg>
);
export default HandballIcon;
