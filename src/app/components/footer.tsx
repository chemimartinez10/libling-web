'use client'
import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import luxemburgImg from '../img/Capa_1.png'
import { poppinsBold } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";


export default function Footer({lang}:{lang:string}) {
    const handleClick = (currLang:string)=>{
        console.log(lang, currLang)
        let currentLocation = window.location.href
        console.log('current location', currentLocation)
        currentLocation = currentLocation.replace(`/${lang}`, `/${currLang}`)
        console.log('new location', currentLocation)
        document.cookie = `NEXT_LOCALE=${currLang}; max-age=31536000; path=/`
        console.log(document.cookie)
        window.location.href = currentLocation
    }
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.contactInfo}>
                    <h4 style={poppinsBold.style}>Contacto</h4>
                    <p>
                        27 Bd Prince Henri, L- 1724 Luxembourg
                    </p>
                    <p>
                        +352691217216
                    </p>
                    <p>
                        info@libling.lu
                    </p>
                    <p>
                        RCS: B278845
                    </p>
                    <p>
                        Autorisation N°10154859/0
                    </p>
                </div>
                {/* <div className={styles.luxemburgContainer}>
                    <Image src={luxemburgImg} alt='madeInLuxemburg' width={96} height={77} />

                </div> */}
                <div className={styles.contactInfo}>
                    <h4 style={poppinsBold.style}>Deja tu mensaje y te contactaremos</h4>
                    <input type="text" name="some" id="" />
                    <div className={styles.socialContainer}>
                        <h4 style={poppinsBold.style}>Síguenos</h4>
                        <div className={styles.socialIconsContainer}>
                            <div className={styles.icon}>
                                <RiFacebookFill />
                            </div>
                            <div className={styles.icon}>
                                <RiInstagramFill />
                            </div>
                            <div className={styles.icon}>
                                <RiLinkedinFill />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.langSelector}>
                <span onClick={()=>{handleClick('es')}}>ES</span>
                <span>|</span>
                <span onClick={() => { handleClick('en') }}>EN</span>
                <span>|</span>
                <span onClick={() => { handleClick('fr') }}>FR</span>
            </div>
        </div>
    )
}
