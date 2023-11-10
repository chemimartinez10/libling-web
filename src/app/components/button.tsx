import React, { ReactNode } from 'react'
import styles from './button.module.css'

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string
    // onClick?:(e:Event) =>{} | VoidFunction
    children?: ReactNode
    alternativeColor?:boolean
}

const Button: React.FC<IButton> = (props) => {
    const { text, alternativeColor=false, children } = props
    return (
        <button className={(alternativeColor === true) ? styles.buttonAlternative : styles.button} onClick={props.onClick}>
            {children}
            <span>
                {text}
            </span>
        </button>
    )
}

export default Button