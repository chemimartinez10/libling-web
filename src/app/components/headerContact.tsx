import React from 'react'
import styles from './headerContact.module.css'
import globalStyles from '@/app/globals.module.css'
import Image from 'next/image';
import headerImg1 from '@/app/img/contact_banner.jpg'
import { dict } from '../utils';
import { poppinsMedium, poppinsSemiBold } from '../fonts';
interface IHeader {
    lang: "es" | "en" | "fr"
}
const HeaderContact:React.FC<IHeader> = ({lang}) => {
    const glosary = dict[lang]?.contact

    return (
        <>
            <div className={styles.sliderItem}>
                <Image src={headerImg1} alt='header image' width={1440} height={450} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                <div className={styles.sliderTextContainer}>
                    <h4 className={globalStyles.miniTitle} style={{...poppinsSemiBold.style, color:'#56B7FF'}}>{glosary.miniTitleHeader1}</h4>
                    <h2 className={[globalStyles.boldTitle, globalStyles.textNegative].join(' ')} style={poppinsSemiBold.style}><span>{glosary.bigTitleHeader1}</span></h2>
                </div>
            </div>
        </>
    )
}

export default HeaderContact