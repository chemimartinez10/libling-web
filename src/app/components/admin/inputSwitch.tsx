import { IInputSwitch } from '@/app/interfaces'
import styles from './input.module.css'
import React, { useEffect, useState } from 'react'

const InputSwitch: React.FC<IInputSwitch> = ({ list, initialValue, onChange }) => {
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
        <div className={styles.switchContainer}>
            {
                list.map((el, index) => (
                    <div key={index} className={selected?.toString() === el.key.toString() ? styles.selectedSwitch : styles.switch} onClick={() => { handleClick(el.key) }}>
                        {el.value} 
                    </div>
                ))
            }
        </div>
    )
}

export default InputSwitch