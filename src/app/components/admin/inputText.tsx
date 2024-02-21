import React, { useRef, useState } from 'react'
import styles from './input.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'

interface ITextInput {
    touched?: boolean
    error?: string
    placeholder?: string
    label?: string
    description?: string
    Icon?: React.ComponentType<any>
    name?: string
    value?: string
    onChange?: VoidFunction
}

export const InputText: React.FC<ITextInput> = ({ name, error, touched, label, placeholder, Icon, description, onChange, value }) => {
    const [active, setActive] = useState(false)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleFocus = () => { }
    const handleBlur = () => { }
    return (
        <div className={styles.formControl}>
            {
                !!label
                &&
                <label htmlFor={`${name}Input`} style={poppinsMedium.style} className={active ? styles.labelActive : error && touched ? styles.labelError : undefined}>
                    <span>{label}</span>
                    <span className={styles.descriptionLabel}>{description}</span>
                </label>
            }
            <div className={styles.inputContainer}>
                <input id={`${name}Input`} name={name} type="text" ref={inputRef} placeholder={placeholder} style={poppinsRegular.style} onFocus={handleFocus} onBlur={handleBlur} onChange={onChange} className={focused ? styles.inputFocus : (error && touched) ? styles.inputError : styles.input} />
            </div>
            {
                !!(error && touched) && <span className={styles.errorMessage} style={poppinsRegular.style}>{error}</span>
            }
        </div>
    )
}
