import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import LogoSVG from '../img/Recurso 1 1.svg'
import Image from 'next/image'
import { poppinsBold } from '../fonts'
import { dict } from '../utils'

export default function Navbar({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.navbar
    return (
        <nav className={styles.navbar}>
            <div className={styles.innernav}>
                <div className={styles.logoContainer}>
                    <Image src={LogoSVG} width={191} height={58} alt='Logo' />
                </div>
                <ul style={poppinsBold.style}>
                    <li><Link href={'/about'}>{glosary.link_1}</Link></li>
                    <li><Link href={'/'}>{glosary.link_2}</Link></li>
                    <li><Link href={'/services'}>{glosary.link_3}</Link></li>
                    <li><Link href={'/contact'}>{glosary.link_4}</Link></li>
                </ul>
            </div>
        </nav>
    )
}
