'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { poppinsMedium } from '../fonts'
import { dict } from '../utils'
import { usePathname, useRouter } from 'next/navigation'
import { LanguageSelector } from './languageSelector'
import LogoNavSVG from './icons/logoNavSVG'
import WhatsappIcon from '@/app/img/whatsapp.png'
import { CountrySelector } from './countrySelector'
import Image from 'next/image'
import { ICountry, ILang } from '../interfaces'
import Menu from './menu'
import { FiLogIn } from 'react-icons/fi'


export default function NavbarImmo({ lang, country }: ICountry & ILang) {
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
                <div className={styles.hiddenNav}>

                    <a href="#contact">
                        <div className={styles.textImageContainer}>
                            <Image src={WhatsappIcon} width={24} height={24} alt='contact' style={{ width: 24, height: 24 }} />
                        </div>
                    </a>
                    <Menu lang={lang} alt={true} />


                </div>
                <ul style={poppinsMedium.style}>
                    <CountrySelector country={country} lang={lang} />
                    <li className={verifyCurrentLink('/') ? styles.selectedLink : undefined}><Link href={'/'}>{'Libling relocation'}</Link></li>
                    <div className={styles.separator}>
                    </div>
                    <LanguageSelector lang={lang} />
                    <li>
                        <a href="#contact">
                            <div className={styles.textImageContainer}>
                                <Image src={WhatsappIcon} width={24} height={24} alt='contact' style={{ width: 24, height: 24 }} />
                                <span>
                                    {glosary.link_4}
                                </span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <Link href={'/auth/login'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <FiLogIn className={styles.icon} />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
