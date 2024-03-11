import React, { useRef, useState } from 'react'
import styles from './input.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'
import { FiEye, FiEyeOff, FiSearch } from 'react-icons/fi'

interface ITextInput {
    touched?: boolean
    error?: string
    placeholder?: string
    label?: string
    description?: string
    Icon?: React.ComponentType<any>
    name?: string
    value?: string
    onChange?: (e: string | React.ChangeEvent<any>) => void
}

export const InputSearch: React.FC<ITextInput> = ({ name, error, touched, label, placeholder, Icon, description, onChange, value }) => {
    // const [active, setActive] = useState(false)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const handleChange: ((e: string | React.ChangeEvent<any>) => void) | undefined = (e) => {
        if (!!value && (!error || !touched)) setFocused(true)
        if (!!e && !!onChange) {
            onChange(e)
        }
    }
    const handleFocus = () => {
        if (!error || !touched) {
            setFocused(true)
        }
    }
    const handleBlur = () => {
        if (!error || !touched) {
            setFocused(false)
        }
    }
    return (
        <div className={styles.formControl}>
            {
                !!label
                &&
                <label htmlFor={`${name}Input`} style={poppinsMedium.style} className={error && touched ? styles.labelError : focused ? styles.labelActive : undefined}>
                    <span>{label}</span>
                    {
                        !!description &&
                        <span className={styles.descriptionLabel}>{" "}({description})</span>
                    }
                </label>
            }
            <div className={styles.inputContainer}>
                <input id={`${name}Input`} name={name} type={"text"} ref={inputRef} value={value} placeholder={placeholder} style={poppinsRegular.style} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} className={(error && touched) ? styles.inputError : focused ? styles.inputFocus : styles.input} />
                <div className={styles.passwordButton} onClick={() => { inputRef.current?.focus() }}>
                    <FiSearch className={styles.passwordIcon} />
                </div>
            </div>
            {
                !!(error && touched) && <span className={styles.errorMessage} style={poppinsRegular.style}>{error}</span>
            }
        </div>
    )
}
