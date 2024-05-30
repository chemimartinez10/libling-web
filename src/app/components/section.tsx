import React, { ReactNode } from 'react'
import styles from './section.module.css'
import globalStyles from '@/app/globals.module.css'
import { poppinsBold, poppinsSemiBold } from '../fonts'

interface ISection {
    title?: string
    subtitle?: string
    resume?: string
    vertical?: boolean
    negative?: boolean
    children?: ReactNode
    backgroundColor?: string
    reverse?: boolean
    space?: boolean

}

const Section: React.FC<ISection> = ({ title, subtitle, resume, vertical = false, negative = false, reverse = false, children, backgroundColor, space }) => {
    return (
        <div className={styles.container} style={{background:backgroundColor, paddingTop: space ? 100 : undefined, paddingBottom: space ? 100 : undefined}}>
            <div className={styles.innerContainer}>
            {
                (title || subtitle || resume) &&
                <div className={styles.head}>
                    {
                        title &&
                            <h2 className={[globalStyles.miniTitle, globalStyles.textPrimary].join(' ')} style={{...poppinsSemiBold.style, color: negative ? '#FFFFFF' : undefined}}>{title}</h2>
                    }
                    {
                        subtitle &&
                            <h3 className={globalStyles.regularTitle} style={{color: negative ? '#FFFFFF' : undefined}}>{subtitle}</h3>
                    }
                    {
                        resume &&
                        <span className={[globalStyles.text].join(' ')} style={{color: negative ? '#FFFFFF' : undefined}}>{resume}</span>

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
        </div>
    )
}

export default Section