import * as React from "react"
import { SVGProps } from "react"
const IconPackPremium = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.6}
      d="M22.9 16.5v8H10.1v-8M24.5 12.5h-16v4h16v-4ZM16.5 24.5v-12M16.5 12.5h-3.6a2 2 0 0 1 0-4c2.8 0 3.6 4 3.6 4ZM16.5 12.5h3.6a2 2 0 0 0 0-4c-2.8 0-3.6 4-3.6 4Z"
    />
  </svg>
)
export default IconPackPremium
