'use client'
import React from 'react'
import styles from './scheduleBanner.module.css'
import globalStyles from '@/app/globals.module.css'
import Image from 'next/image';
import headerImg1Contact from '@/app/img/banner_contactanos_1440.jpg'
import { dict } from '../utils';
import { poppinsMedium, poppinsRegular } from '../fonts';
import { Button } from './admin/button';
interface IBanner {
    lang: "es" | "en" | "fr"
}

export const ScheduleBanner:React.FC<IBanner> = ({lang}) => {
    const glosary = dict[lang]?.services

    return (
        <>
            <div className={styles.sliderItem}>
                <Image src={headerImg1Contact} alt='header image' width={1440} height={340} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                <div className={styles.sliderTextContainer}>
                    <h2 className={globalStyles.mediumTitle} style={poppinsRegular.style}><span>{glosary.contactTitle}</span></h2>
                    <Button title={glosary.contactActionButton}/>
                </div>
            </div>
        </>
    )
}
