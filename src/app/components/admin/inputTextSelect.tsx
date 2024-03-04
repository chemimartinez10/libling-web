'use client'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styles from './input.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import { dict } from '@/app/utils'
import { IInputTextSelect, ISelectElement } from '@/app/interfaces'

const InputTextSelect: React.FC<IInputTextSelect> = ({ label, placeholder, list, onAdd, error, touched, description, onChange, name, lang, initialValue }) => {
    const [focused, setFocused] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [listFiltered, setListFiltered] = useState<ISelectElement[]>(list)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const glosary = dict[lang]?.adminProperties
    

    const handleChange: ((el: ISelectElement) => void) | undefined = (e) => {
        console.log(e)
        if (!!e.value && (!error || !touched)) setFocused(true)
        if (!!e.key && !!e.value && !!onChange) {
            if (inputRef?.current) {
                inputRef.current.value = e.value.toString()
            }
            onChange(e.key.toString())
            handleBlur()
        }
    }
    const handleAdd: MouseEventHandler<HTMLDivElement> = () => {
        if (!!inputRef?.current?.value?.trim() && !!onAdd) onAdd(inputRef?.current?.value?.trim())
    }
    const handleSearch: ((e: string | React.ChangeEvent<HTMLInputElement>) => void) | undefined = (e) => {
        if (typeof e !== 'string' && !!e.target.value.trim()) {
            handleFilter(e.target.value.trim())
        }
        else {
            setListFiltered([...list])
        }
    }
    const handleFilter: (str: string) => void = (str) => {
        setListFiltered(list.filter(el => el.value.toString().toLowerCase().includes(str.toLowerCase())))
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
        setListFiltered(list)
        console.log('here 0', initialValue)
        if (!!initialValue) {
            const initialElement = list.find(el => el.key.toString() === initialValue.toString())
            console.log('here 1')
            if (initialElement && inputRef?.current) {
                console.log('here 2')
                inputRef.current.value = initialElement.value.toString()
            }
        }
    }, [initialValue, list])
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
                <input id={`${name}Input`} name={name} type={"text"} ref={inputRef} placeholder={placeholder} style={poppinsRegular.style} onFocus={handleFocus} onBlur={handleBlur} onChange={handleSearch} className={(error && touched) ? styles.inputError : focused ? styles.inputFocus : styles.input} />
                <div className={styles.passwordButton} onClick={handleClick}>
                    {
                        openList
                            ?
                            <FiChevronUp className={styles.passwordIcon} />
                            :
                            <FiChevronDown className={styles.passwordIcon} />
                    }
                </div>
                <div className={openList ? styles.listContainer : styles.listContainerHidden}>
                    {
                        (listFiltered?.length <= 0)
                        &&
                        <div className={styles.listItem} onClick={handleAdd}><FiPlus className={styles.iconPlus} /><span>{glosary.formPlaceholderSelectAdd}{`: "${inputRef?.current?.value}"`}</span></div>
                    }
                    {
                        listFiltered.map((el, index) => (
                            <div key={index} className={styles.listItem} onClick={() => { handleChange(el) }}>
                                {el.value}
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

export default InputTextSelect
