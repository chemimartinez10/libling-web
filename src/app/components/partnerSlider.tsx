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
import Logo1 from '@/app/img/logo_partner_assurin.jpg'
import Logo2 from '@/app/img/logo_partner_chamber_of_commerce_luxembourg.jpg'
import Logo3 from '@/app/img/logo_partner_elena_lustina_panescu.jpg'
import Logo4 from '@/app/img/logo_partner_house_of_training.jpg'
import Logo5 from '@/app/img/logo_partner_husky_devs@2x.jpg'
import Logo6 from '@/app/img/logo_partner_lalux_assurances.jpg'
import Logo7 from '@/app/img/logo_partner_schemberger_photographe.jpg'
import Logo8 from '@/app/img/logo_partner_translations_panescu.jpg'
import Logo9 from '@/app/img/logo_partner_zak_architect.jpg'

const PartnerSlider = () => {
  return (
    <>
    <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showStatus={false} showArrows={false} centerMode={true} centerSlidePercentage={25} className={styles.slider}>
        <div className={styles.sliderItem}>
            <Image src={Logo1} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo2} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo3} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo4} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo5} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo6} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo7} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo8} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
        <div className={styles.sliderItem}>
            <Image src={Logo9} alt='header image' width={164} height={64} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} quality={100}/>
        </div>
    </Carousel>
    </>
  )
}

export default PartnerSlider