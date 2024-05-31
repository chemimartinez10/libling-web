import * as React from "react"
import { SVGProps } from "react"
const IconPackStandar = (props: SVGProps<SVGSVGElement>) => (
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
      d="m11.7 8.5-2.4 3.2v11.2a1.6 1.6 0 0 0 1.6 1.6h11.2a1.6 1.6 0 0 0 1.6-1.6V11.7l-2.4-3.2h-9.6ZM9.3 11.7h14.4"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.74}
      strokeWidth={1.6}
      d="M19.7 14.9a3.2 3.2 0 1 1-6.4 0"
    />
  </svg>
)
export default IconPackStandar
