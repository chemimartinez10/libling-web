import React, { ReactNode } from 'react'
import styles from './section.module.css'

interface ISection {
    title?: string
    subtitle?: string
    resume?: string
    vertical?: boolean
    children?: ReactNode
    backgroundColor?: string

}

const Section: React.FC<ISection> = ({ title, subtitle, resume, vertical = false, children, backgroundColor }) => {
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
                        <h3 className={styles.subtitle}>{subtitle}</h3>
                    }
                    {
                        resume &&
                        <h4 className={styles.resume}>{resume}</h4>

                    }
                </div>
            }
            <div className={styles.body}>
                {children}
            </div>
        </div>
    )
}

export default Section