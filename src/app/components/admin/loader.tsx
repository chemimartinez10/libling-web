import React from 'react'
import styles from './loader.module.css'

interface ILoader {
    color?: string
}

const Loader: React.FC<ILoader> = ({ color = '#fff' }) => {
    return (
        <div className={styles.loader} style={{ color }}></div>
    )
}

export default Loader