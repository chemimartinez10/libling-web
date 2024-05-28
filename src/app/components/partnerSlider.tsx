import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './partnerSlider.module.css'
import Image from 'next/image';
import LogoApple from '@/app/img/logo_apple.png'
import LogoBinance from '@/app/img/logo_binance.png'
import LogoCosmos from '@/app/img/logo_cosmos.png'
import LogoEtherium from '@/app/img/logo_ethereum_foundation.png'
import LogoGoogle from '@/app/img/logo_google.png'
import LogoMeta from '@/app/img/logo_meta.png'
import LogoMicrosoft from '@/app/img/logo_microsoft.png'

const PartnerSlider = () => {
  return (
    <>
    <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showStatus={false} showArrows={false} centerMode={true} centerSlidePercentage={25} className={styles.slider}>
        <div className={styles.sliderItem}>
            <Image src={LogoApple} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoBinance} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoCosmos} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoEtherium} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoGoogle} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoMeta} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={LogoMicrosoft} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
    </Carousel>
    </>
  )
}

export default PartnerSlider