'use client'
import { poppinsMedium } from '@/app/fonts'
import mainStyle from './buttonMain.module.css'
import tonalStyle from './buttonOutline.module.css'
import outlineStyle from './buttonOutline.module.css'
import textStyle from './buttonText.module.css'
import warningStyle from './buttonWarning.module.css'
import errorStyle from './buttonError.module.css'
import React, { useState } from 'react'

interface IButton {
    type: 'main' | 'tonal' | 'outline' | 'text' | 'warning' | 'error'
    title: string
    Icon?: React.ComponentType<any>
    loading?: boolean
    disabled?: boolean
    onClick?: VoidFunction
}


export const Button: React.FC<IButton> = ({ type = 'main', title, Icon, loading = false, disabled = false, onClick = () => { } }) => {
    let style: {
        readonly [key: string]: string;
    }
    switch (type) {
        case 'main':
            style = mainStyle
            break
        case 'tonal':
            style = tonalStyle
            break
        case 'outline':
            style = outlineStyle
            break
        case 'text':
            style = textStyle
            break
        case 'warning':
            style = warningStyle
            break
        case 'error':
            style = errorStyle
            break
        default:
            style = mainStyle
            break
    }
    const [currentStyle, setCurrentStyle] = useState(disabled ? style.buttonDisabled : style.button)
    const handleMouseDown = ()=>{
        if(!loading && !disabled){
            setCurrentStyle(style?.buttonPressed)
        }
    }
    const handleMouseUp = ()=>{
        if(!loading && !disabled){
            setCurrentStyle(style.button)
        }
    }

    return (
        <button className={currentStyle} onClick={loading || disabled ? () => { } : onClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp}>
            {!!Icon && <Icon className={style.icon} />}
            {
                loading
                    ?
                    <span className={style.loader}>
                    </span>
                    :
                    <span style={poppinsMedium.style}>
                        {title}
                    </span>
            }
        </button>
    )
}
