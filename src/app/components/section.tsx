import React, { ReactNode } from 'react'
import styles from './section.module.css'
import { poppinsBold, poppinsSemiBold } from '../fonts'

interface ISection {
    title?: string
    subtitle?: string
    resume?: string
    vertical?: boolean
    children?: ReactNode
    backgroundColor?: string
    reverse?: boolean

}

const Section: React.FC<ISection> = ({ title, subtitle, resume, vertical = false, reverse = false, children, backgroundColor }) => {
    return (
        <div className={styles.container}>
            {
                (title || subtitle || resume) &&
                <div className={styles.head}>
                    {
                        title &&
                        <h2 className={styles.title}>{title}</h2>
                    }
                    {
                        subtitle &&
                            <h3 className={styles.subtitle} style={poppinsBold.style}>{subtitle}</h3>
                    }
                    {
                        resume &&
                        <h4 className={styles.resume}>{resume}</h4>

                    }
                </div>
            }
            {
                (vertical === true)
                ?
                <div className={reverse ? styles.bodyVerticalReversed : styles.bodyVertical}>
                    {children}
                </div>
                :
                <div className={reverse ? styles.bodyReversed : styles.body}>
                    {children}
                </div>
            }
        </div>
    )
}

export default Section