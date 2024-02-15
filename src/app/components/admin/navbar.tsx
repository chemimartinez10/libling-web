'use client'
import React from 'react'
import styles from './navbar.module.css'
import { logOut } from '@/app/actions';
import { dict } from '@/app/utils';
import { usePathname } from 'next/navigation';
import LogoSVG from '../../img/Recurso 1 1.svg'
import Image from 'next/image';
import Link from 'next/link';
import { poppinsBold } from '@/app/fonts';
import { CountrySelector } from '../countrySelector';

export default function Navbar({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.navbar
    const pathname = usePathname()
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
                    <li className={(verifyCurrentLink('admin/properties')) ? styles.selectedLink : undefined}><Link href={'/admin/properties'}>{glosary.admin_1}</Link></li>
                </ul>
                <div>
                    <button className={styles.logOut} onClick={async () => {
                        await logOut();
                    }}>
                        Cerrar sesión
                    </button>
                </div>
                <div className={styles.formSelector}>
                    <CountrySelector lang={lang} />
                </div>
            </div>
        </nav>
    )
}
