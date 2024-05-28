import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './headerHome.module.css'
import globalStyles from '@/app/globals.module.css'
import Image from 'next/image';
import headerImg1 from '@/app/img/carrusel_banner_1_1440.jpg'
import headerImg2 from '@/app/img/carrusel_banner_2_1440.jpg'
import headerImg3 from '@/app/img/carrusel_banner_3_1440.jpg'
import { dict } from '../utils';
import { Button } from './admin/button';
import { FaChevronRight } from 'react-icons/fa';
import { poppinsMedium, poppinsSemiBold } from '../fonts';
interface IHeader {
    lang: "es" | "en" | "fr"
}
const HeaderHome:React.FC<IHeader> = ({lang}) => {
    const glosary = dict[lang]?.home

    return (
        <>
            <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showStatus={false}>
                <div className={styles.sliderItem}>
                    <Image src={headerImg1} alt='header image' width={1440} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                    <div className={styles.sliderTextContainer}>
                        <h4 className={[globalStyles.miniTitle, globalStyles.textPrimary].join(' ')} style={poppinsSemiBold.style}>{glosary.miniTitleHeader1}</h4>
                        <h2 className={globalStyles.bigTitle} style={poppinsMedium.style}><span>{glosary.bigTitleHeader1_1}</span><span className={globalStyles.textPrimary}>{glosary.bigTitleHeader1_2}</span> </h2>
                        <p className={globalStyles.commonText}>{glosary.commonHeader1}</p>
                        <Button title={glosary.actionButtonHeader1} Icon={FaChevronRight}/>
                    </div>
                </div>
                <div className={styles.sliderItem}>
                    <Image src={headerImg2} alt='header image' width={1440} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                    <div className={styles.sliderTextContainer}>
                        <h4 className={globalStyles.miniTitle} style={poppinsSemiBold.style}>{glosary.miniTitleHeader2}</h4>
                        <h2 className={globalStyles.bigTitle} style={poppinsMedium.style}><span className={globalStyles.textPrimary}>{glosary.bigTitleHeader2_1}</span><span>{glosary.bigTitleHeader2_2}</span> </h2>
                        <p className={globalStyles.commonText}>{glosary.commonHeader2}</p>
                        <Button title={glosary.actionButtonHeader2} Icon={FaChevronRight}/>
                    </div>
                </div>
                <div className={styles.sliderItem}>
                    <Image src={headerImg3} alt='header image' width={1440} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100} sizes="(max-width: 1440px) 100vw, 1440px" className={styles.sliderImage}/>
                    <div className={styles.sliderTextContainer}>
                        <h4 className={globalStyles.miniTitle} style={poppinsSemiBold.style}>{glosary.miniTitleHeader3}</h4>
                        <h2 className={globalStyles.bigTitle} style={poppinsMedium.style}><span>{glosary.bigTitleHeader3_1}</span><span className={globalStyles.textPrimary}>{glosary.bigTitleHeader3_2}</span> </h2>
                        <p className={globalStyles.commonText}>{glosary.commonHeader3}</p>
                        <Button title={glosary.actionButtonHeader3} Icon={FaChevronRight}/>
                    </div>
                </div>
            </Carousel>
        </>
    )
}

export default HeaderHome