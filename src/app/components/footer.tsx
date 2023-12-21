'use client'
import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import luxemburgImg from '../img/Capa_1.png'
import { poppinsBold, poppinsMedium } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";


export default function Footer({ lang }: { lang: string }) {
    const handleClick = (currLang: string) => {
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
                        <span style={poppinsMedium.style}>Email: </span>info@libling.lu / <span style={poppinsMedium.style}>Telf: </span>+352691217216
                        <br />
                        27 Bd Prince Henri, L- 1724 Luxembourg / RCS número d’Immatriculation B278845 Autorisation d’établissement N°10154859/0

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
                            <a className={styles.icon} href="https://www.facebook.com/profile.php?id=61554771181200" >
                                <RiFacebookFill />
                            </a>
                            <a className={styles.icon} href="https://www.instagram.com/libling_solutions">
                                <RiInstagramFill />
                            </a>
                            <a className={styles.icon} href="https://www.linkedin.com/company/libling/">
                                <RiLinkedinFill />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.langSelector}>
                <span onClick={() => { handleClick('es') }}>ES</span>
                <span>|</span>
                <span onClick={() => { handleClick('en') }}>EN</span>
                <span>|</span>
                <span onClick={() => { handleClick('fr') }}>FR</span>
            </div>
        </div>
    )
}
