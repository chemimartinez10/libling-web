import { IInputSwitch } from '@/app/interfaces'
import styles from './input.module.css'
import React, { useEffect, useState } from 'react'
import { poppinsMedium } from '@/app/fonts'

const InputSwitch: React.FC<IInputSwitch> = ({ list, initialValue, onChange, label, mainColor = '#1973FA', textColor = '#fff' }) => {
    const [selected, setSelected] = useState(initialValue)
    console.log('initial switch key', initialValue)
    const handleClick = (key: string | number) => {
        setSelected(key)
        if (!!onChange) onChange(key)
    }
    useEffect(() => {
        setSelected(initialValue)
    }, [initialValue])
    return (
        <div className={styles.formControl}>
            {
                !!label
                &&
                <label style={poppinsMedium.style}>
                    <span>{label}</span>
                </label>
            }
            <div className={styles.switchContainer}>
                {
                    list.map((el, index) => (
                        <div key={index} className={selected?.toString() === el.key.toString() ? styles.selectedSwitch : styles.switch} style={selected?.toString() === el.key.toString() ? { backgroundColor: mainColor, color: textColor } : undefined} onClick={() => { handleClick(el.key) }}>
                            {el.value}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default InputSwitch