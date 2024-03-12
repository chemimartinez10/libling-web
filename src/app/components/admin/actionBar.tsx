import React from 'react'
import styles from './actionBar.module.css'

interface IActionBar {
    show: boolean
    Content?: React.ElementType<any>
    width?: number
}

const ActionBar: React.FC<IActionBar> = ({ show, Content, width = '100%' }) => {
    return (show ?
        <div className={styles.container}>
            <div className={styles.innerContainer} style={{ width }}>
                {
                    !!Content
                    &&
                    <Content />
                }
            </div>
        </div>
        : <></>
    )
}

export default ActionBar