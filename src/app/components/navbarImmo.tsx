'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import { poppinsBold, poppinsMedium } from '../fonts'
import { dict } from '../utils'
import { usePathname, useRouter } from 'next/navigation'
import { CountrySelector } from './countrySelector'
import LogoNavSVG from './icons/logoNavSVG'
import WhatsappIcon from '@/app/img/whatsapp.png'


export default function NavbarImmo({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.navbar
    const pathname = usePathname()
    const router = useRouter()
    const verifyCurrentLink = (site: string) => {
        let currentLocation = pathname
        if (currentLocation.includes(site)) return true
        return false
    }
    return (
        <nav className={styles.navbarImmo}>
            <div className={styles.innernav}>
                <div className={styles.logoContainer} onClick={() => { router.push('/') }}>
                    <LogoNavSVG />
                </div>
                <ul style={poppinsMedium.style}>
                    <li className={verifyCurrentLink('/') ? styles.selectedLink : undefined}><Link href={'/'}>{'Libling relocation'}</Link></li>
                    <div className={styles.separator}>

                    </div>
                    <CountrySelector lang={lang} />
                    <li><a href="#contact">
                        <div className={styles.textImageContainer}>
                            <img style={{ width: 24, height: 24 }} src={WhatsappIcon.src} alt='contact' />
                            <span>
                                {glosary.link_4}
                            </span>
                        </div>

                    </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
