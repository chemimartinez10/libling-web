'use client'
import React from 'react'
import styles from './scheduleBanner.module.css'
import globalStyles from '@/app/globals.module.css'
import Image from 'next/image';
import headerImg1Contact from '@/app/img/banner_contactanos_1440.jpg'
import headerImg2Contact from '@/app/img/banner_services_mobile_2.jpg'
import { dict } from '../utils';
import { poppinsMedium, poppinsRegular } from '../fonts';
import { Button } from './admin/button';
import useWindowDimensions from '../hooks/useWindowDimensions';
interface IBanner {
    lang: "es" | "en" | "fr"
}

export const ScheduleBanner:React.FC<IBanner> = ({lang}) => {
    const glosary = dict[lang]?.services
    const { height, width } = useWindowDimensions();

    return (
        <>
            <div className={styles.sliderItem}>
                {
                    (width !== null && width <= 500)
                    ?
                    <Image src={headerImg2Contact} alt='contact image' width={360} height={580} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 360px) 100vw, 360px" className={styles.sliderImage}/>
                    :
                    <Image src={headerImg1Contact} alt='contact image' width={1440} height={340} priority={true} style={{ objectFit: 'cover', objectPosition: 'right center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                }
                <div className={styles.sliderTextContainer}>
                    <h2 className={globalStyles.mediumTitle} style={poppinsRegular.style}><span>{glosary.contactTitle}</span></h2>
                    <Button title={glosary.contactActionButton}/>
                </div>
            </div>
        </>
    )
}
