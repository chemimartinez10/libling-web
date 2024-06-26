'use client'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styles from './input.module.css'
import buttonStyles from './buttonOutline.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'
import { IInputSelect, IInputSelectButton, ISelectElement, dataTranslate } from '@/app/interfaces'
import { dict } from '@/app/utils'

const InputSelectButton: React.FC<IInputSelectButton> = ({list, error, touched, onChange, initialValue, lang,title, loading = false, disabled = false, grow=false }) => {
    const [focused, setFocused] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [currentStyle, setCurrentStyle] = useState(disabled ? buttonStyles.buttonDisabled : buttonStyles.button)
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
    const handleMouseDown = () => {
        if (!loading && !disabled) {
            setCurrentStyle(buttonStyles?.buttonPressed)
        }
    }
    const handleMouseUp = () => {
        if (!loading && !disabled) {
            setCurrentStyle(buttonStyles.button)
        }
    }
    const handleClick = () => {
        setOpenList(state => !state)
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
        setTimeout(()=>{
            setOpenList(false)
        },200)
    }
    useEffect(() => {
        if (!!list) {
            setListFiltered(list)
        }
    }, [list])
    return (
        <div className={styles.formControl}>
            <div className={styles.inputContainer}>
                <button className={currentStyle} onMouseDown={handleMouseDown} onClick={handleClick} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp} type={'button'} style={{flexGrow: grow ? 1: undefined}} onFocus={loading || disabled ? () => { } :handleFocus} onBlur={handleBlur}>

                    {
                        loading
                            ?
                            <span className={buttonStyles.loader}>
                            </span>
                            :
                            <span style={poppinsMedium.style}>
                                {title}
                            </span>
                    }
                </button>
                <div className={openList ? styles.listContainer : styles.listContainerHidden}>
                    {
                        listFiltered.map((el, index) => (
                            <div key={index} className={styles.listItem} onClick={() => { handleChange(el) }} onMouseDown={() => { handleChange(el) }}>
                                {
                                    (!!lang && !!el.value && el.value in dict[lang].data && dict[lang].data[el.value as dataTranslate])
                                        ?
                                        dict[lang].data[el.value as dataTranslate]
                                        :
                                        el.value
                                }
                                {
                                    !!el.description ? <span className={styles.listItemDescription}>
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

export default InputSelectButton
