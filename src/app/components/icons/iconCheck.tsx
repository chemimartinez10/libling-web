import * as React from "react"
import { SVGProps } from "react"
const IconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || "#1973fa"}
      d="m9.55 17.654-5.335-5.335 1.07-1.069 4.265 4.265 9.165-9.165 1.07 1.07z"
    />
  </svg>
)
export default IconCheck
