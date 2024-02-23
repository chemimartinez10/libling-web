import React, { useState } from 'react'
import styles from './input.module.css'
import { IInputRadio } from '@/app/interfaces'
import { poppinsMedium } from '@/app/fonts'

export const InputRadio: React.FC<IInputRadio> = ({ label, description, initialValue = true, onChange = () => { }, option_1, option_2 }) => {
    const [value, setValue] = useState(initialValue)
    const handleOption = (e: boolean) => {
        onChange(e)
        setValue(e)
    }
    return (
        <div className={styles.radioContainer}>
            <label className={styles.radioLabel} style={poppinsMedium.style}>
                <span>{label}</span>
                <span className={styles.descriptionLabel}>{description}</span>
            </label>
            <div className={styles.radioOptionContainer}>
                <div className={styles.radioControl} onClick={() => { handleOption(true) }}>
                    <div className={value ? styles.radioSelected : styles.radio}>
                        <div className={styles.radioRing}>
                            <div className={styles.radioCircle}></div>
                        </div>
                    </div>
                    <span className={styles.radioOption}>{option_1}</span>
                </div>
                <div className={styles.radioControl} onClick={() => { handleOption(false) }}>
                    <div className={!value ? styles.radioSelected : styles.radio}>
                        <div className={styles.radioRing}>
                            <div className={styles.radioCircle}></div>
                        </div>
                    </div>
                    <span className={styles.radioOption}>{option_2}</span>
                </div>

            </div>
        </div>
    )
}
