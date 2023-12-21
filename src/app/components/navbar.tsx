'use client'
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import LogoSVG from '../img/Recurso 1 1.svg'
import Image from 'next/image'
import { poppinsBold } from '../fonts'
import { dict } from '../utils'
import { usePathname } from 'next/navigation'

export default function Navbar({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.navbar
    const pathname = usePathname()
    const handleClick = (currLang: string) => {
        console.log(lang, currLang)
        if (currLang) {
            let currentLocation = window.location.href
            console.log('current location', currentLocation)
            currentLocation = currentLocation.replace(`/${lang}`, `/${currLang}`)
            console.log('new location', currentLocation)
            document.cookie = `NEXT_LOCALE=${currLang}; max-age=31536000; path=/`
            console.log(document.cookie)
            window.location.href = currentLocation

        }
    }
    const verifyCurrentLink = (site: string) => {
        let currentLocation = pathname
        if (currentLocation.includes(site)) return true
        return false
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.innernav}>
                <div className={styles.logoContainer}>
                    <Image src={LogoSVG} width={191} height={58} alt='Logo' />
                </div>
                <ul style={poppinsBold.style}>
                    <li className={verifyCurrentLink('/about') ? styles.selectedLink : undefined}><Link href={'/about'}>{glosary.link_1}</Link></li>
                    <li className={(!verifyCurrentLink('/about') && !verifyCurrentLink('/services') && !verifyCurrentLink('/contact')) ? styles.selectedLink : undefined}><Link href={'/'}>{glosary.link_2}</Link></li>
                    <li className={verifyCurrentLink('/services') ? styles.selectedLink : undefined}><Link href={'/services'}>{glosary.link_3}</Link></li>
                    <li className={verifyCurrentLink('/contact') ? styles.selectedLink : undefined}><Link href={'/contact'}>{glosary.link_4}</Link></li>
                </ul>
                <div className={styles.formSelector}>
                    <select name="language" id="language" onChange={(event) => { handleClick(event?.target?.value) }}>
                        <option value="es" selected={lang === 'es' ? true : undefined}>🇪🇸</option>
                        <option value="en" selected={lang === 'en' ? true : undefined}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
                        <option value="fr" selected={lang === 'fr' ? true : undefined}>🇫🇷</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}
