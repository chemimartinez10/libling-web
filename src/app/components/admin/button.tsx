'use client'
import { poppinsMedium } from '@/app/fonts'
import mainStyle from './buttonMain.module.css'
import secondaryStyle from './buttonSecondary.module.css'
import tonalStyle from './buttonTonal.module.css'
import outlineStyle from './buttonOutline.module.css'
import textStyle from './buttonText.module.css'
import warningStyle from './buttonWarning.module.css'
import errorStyle from './buttonError.module.css'
import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

interface IButton {
    type?: 'main' | 'secondary' | 'tonal' | 'outline' | 'text' | 'warning' | 'error'
    icon?: 'ws'
    title: string
    Icon?: React.ComponentType<any>
    loading?: boolean
    disabled?: boolean
    onClick?: VoidFunction
    goTo?: string
    submit?: boolean
}


export const Button: React.FC<IButton> = ({ type = 'main', title, Icon, loading = false, disabled = false, onClick = () => { }, submit = false, icon, goTo }) => {
    let style: {
        readonly [key: string]: string;
    }
    let IconFunc: React.ComponentType<any> | null

    switch (icon) {
        case 'ws':
            IconFunc = FaWhatsapp
            break
        default:
            IconFunc = null
            break
    }
    switch (type) {
        case 'main':
            style = mainStyle
            break
        case 'secondary':
            style = secondaryStyle
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
    const router = useRouter()
    const handleMouseDown = () => {
        if (!loading && !disabled) {
            setCurrentStyle(style?.buttonPressed)
        }
    }
    const handleMouseUp = () => {
        if (!loading && !disabled) {
            setCurrentStyle(style.button)
        }
    }

    return (
        <button className={currentStyle} onClick={loading || disabled ? () => { } : !!goTo ? () => { router.push(goTo) } : onClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp} type={submit ? 'submit' : 'button'}>
            {!!Icon && <Icon className={style.icon} />}
            {!!IconFunc && <IconFunc className={style.iconFunc} />}

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
