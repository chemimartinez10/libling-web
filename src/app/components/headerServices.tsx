import React from 'react'
import styles from './headerServices.module.css'
import globalStyles from '@/app/globals.module.css'
import Image from 'next/image';
import headerImg1 from '@/app/img/services_header_1440.jpg'
import { dict } from '../utils';
import { poppinsMedium } from '../fonts';
interface IHeader {
    lang: "es" | "en" | "fr"
}
const HeaderServices:React.FC<IHeader> = ({lang}) => {
    const glosary = dict[lang]?.services

    return (
        <>
            <div className={styles.sliderItem}>
                <Image src={headerImg1} alt='header image' width={1440} height={450} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                <div className={styles.sliderTextContainer}>
                    <h2 className={globalStyles.bigTitle} style={poppinsMedium.style}><span>{glosary.bigTitleHeader1_1}</span></h2>
                    <p className={globalStyles.commonText}>{glosary.commonHeader1}</p>
                </div>
            </div>
        </>
    )
}

export default HeaderServices