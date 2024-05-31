import React, { ReactNode } from 'react'
import styles from './section.module.css'
import globalStyles from '@/app/globals.module.css'
import { poppinsBold, poppinsSemiBold } from '../fonts'
import Image, { StaticImageData } from 'next/image'

interface ISection {
    title?: string
    subtitle?: string
    resume?: string
    vertical?: boolean
    negative?: boolean
    children?: ReactNode
    backgroundColor?: string
    backgroundImage?: StaticImageData
    reverse?: boolean
    space?: boolean

}

const Section: React.FC<ISection> = ({ title, subtitle, resume, vertical = false, negative = false, reverse = false, children, backgroundColor, space, backgroundImage }) => {
    return (
        <div className={styles.container} style={{background:backgroundColor, paddingBottom: space ? 260 : undefined}}>
            {!!backgroundImage && <Image src={backgroundImage} alt='background' style={{position:'absolute', zIndex:1, pointerEvents:'none', top:0, left:0, width:'100%', height:'100%', objectFit: 'cover', objectPosition:'center center'}}/>}
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