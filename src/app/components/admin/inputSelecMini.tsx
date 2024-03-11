'use client'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styles from './input.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import { IInputSelect, ISelectElement, dataTranslate } from '@/app/interfaces'
import { dict } from '@/app/utils'

const InputSelectMini: React.FC<IInputSelect> = ({ label, placeholder, list, error, touched, description, onChange, name, initialValue, lang }) => {
    const [focused, setFocused] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [listFiltered, setListFiltered] = useState<ISelectElement[]>(list || [])
    const inputRef = useRef<HTMLInputElement | null>(null)
    if (!!initialValue) {
        const initialElement = list.find(el => el.key.toString() === initialValue.toString())
        if (initialElement && inputRef?.current) {
            inputRef.current.value = initialElement.value.toString()
        }
    }

    const handleChange: ((el: ISelectElement) => void) | undefined = (e) => {
        console.log(e)
        if (!!e.value && (!error || !touched)) setFocused(true)
        if (!!e.key && !!e.value && !!onChange) {
            if (inputRef?.current) {

                if (!!lang && !!e.value && e.value in dict[lang].data && dict[lang].data[e.value as dataTranslate]) {

                    inputRef.current.value = dict[lang].data[e.value.toString() as dataTranslate]

                } else {

                    inputRef.current.value = e.value.toString()
                }


            }
            onChange(e.key.toString())
        }
        handleBlur()
    }
    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        if (openList && inputRef?.current) {
            inputRef.current?.blur()
        } else {
            inputRef.current?.focus()
        }
    }
    const handleFocus = () => {
        if (!error || !touched) {
            setFocused(true)
        }
        setOpenList(true)
    }
    const handleBlur = () => {
        if (!error || !touched) {
            setFocused(false)
        }
        setOpenList(false)
    }
    useEffect(() => {
        if (!!list) {
            setListFiltered(list)
        }
    }, [list])
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
            <div className={styles.inputContainerMini}>
                <input id={`${name}Input`} name={name} type={"text"} ref={inputRef} readOnly placeholder={placeholder} style={{ cursor: 'pointer', ...poppinsRegular.style }} onFocus={handleFocus} onBlur={handleBlur} className={(error && touched) ? styles.inputErrorMini : focused ? styles.inputFocusMini : styles.inputMini} />
                <div className={styles.passwordButtonMini} onClick={handleClick}>
                    {
                        openList
                            ?
                            <FiChevronUp className={styles.passwordIconMini} />
                            :
                            <FiChevronDown className={styles.passwordIconMini} />
                    }
                </div>
                <div className={openList ? styles.listContainerMini : styles.listContainerHidden}>
                    {
                        listFiltered.map((el, index) => (
                            <div key={index} className={styles.listItemMini} onClick={() => { handleChange(el) }} onMouseDown={() => { handleChange(el) }}>
                                {
                                    (!!lang && !!el.value && el.value in dict[lang].data && dict[lang].data[el.value as dataTranslate])
                                        ?
                                        dict[lang].data[el.value as dataTranslate]
                                        :
                                        el.value
                                }
                                {
                                    !!el.description ? <span className={styles.listItemDescriptionMini}>
                                        {` (${el.description})`}
                                    </span> : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                !!(error && touched) && <span className={styles.errorMessage} style={poppinsRegular.style}>{error}</span>
            }
        </div>
    )
}

export default InputSelectMini
