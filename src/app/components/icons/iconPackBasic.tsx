import * as React from "react"
import { SVGProps } from "react"
const IconPackBasic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <rect width={32} height={32} x={0.5} y={0.5} fill="#1973FA" rx={4} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.74}
      strokeWidth={1.636}
      d="M14.046 24.591a.818.818 0 1 0 0-1.636.818.818 0 0 0 0 1.636ZM23.046 24.591a.818.818 0 1 0 0-1.636.818.818 0 0 0 0 1.636ZM7.5 7.41h3.273l2.193 10.955a1.636 1.636 0 0 0 1.636 1.317h7.953a1.636 1.636 0 0 0 1.636-1.317L25.5 11.5H11.59"
    />
  </svg>
)
export default IconPackBasic
