'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import { poppinsBold, poppinsMedium } from '../fonts'
import { dict } from '../utils'
import { usePathname, useRouter } from 'next/navigation'
import { LanguageSelector } from './languageSelector'
import LogoNavSVG from './icons/logoNavSVG'
import WhatsappIcon from '@/app/img/whatsapp.png'
import { FiLogIn } from 'react-icons/fi'
import { FaBars, FaChevronDown } from 'react-icons/fa6'
import InputSelectButton from './admin/inputSelectButton'
import LinkSelect from './admin/linkSelect'


export default function Navbar({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.navbar
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const affiliateList = [
        {
            key:1,
            value:glosary.link_6,
            extra:'/services?member=1'
        },
        {
            key:2,
            value:glosary.link_7,
            extra:'/services?member=2'
        },
    ]
    const router = useRouter()
    const verifyCurrentLink = (site: string) => {
        let currentLocation = pathname
        if (currentLocation.includes(site)) return true
        return false
    }
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.innernav}>
                    <div className={styles.logoContainer} onClick={() => { router.push('/') }}>
                        <LogoNavSVG />
                    </div>
                    <ul style={poppinsMedium.style}>
                        <li className={verifyCurrentLink('/about') ? styles.selectedLink : undefined}><Link href={'/about'}>{glosary.link_1}</Link></li>
                        <li className={verifyCurrentLink('/services') ? styles.selectedLink : undefined}><Link href={'/services'}>{glosary.link_3}</Link></li>
                        <li className={verifyCurrentLink('/immo') ? styles.selectedLink : undefined}><Link href={'/immo'}>{'Libling Immo'}</Link></li>
                        <li ><LinkSelect list={affiliateList} title={glosary.link_5} lang={lang}/></li>
                        <div className={styles.separator}>
                        </div>
                        <LanguageSelector lang={lang} />
                        <div className={styles.textImageContainer}>
                            <a target='_blank' href={`https://api.whatsapp.com/send?phone=${352691367757}`}>
                                <Image width={24} height={24} style={{ width: 24, height: 24 }} src={WhatsappIcon} alt='contact' />
                            </a>
                            <li className={verifyCurrentLink('/contact') ? styles.selectedLink : undefined}><Link href={'/contact'}>
                                <span>
                                    {glosary.link_4}
                                </span>
                            </Link></li>
                        </div>

                        <li>
                            <Link href={'/auth/login'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FiLogIn className={styles.icon} />
                            </Link>

                        </li>

                    </ul>
                    <div className={styles.mobileMenu}>
                        <FaBars className={styles.closeIcon} onClick={()=>{setOpen(state => !state)}}/>
                        <div className={styles.separator}></div>
                        <div className={styles.textImageContainer}>
                            <a target='_blank' href={`https://api.whatsapp.com/send?phone=${352691367757}`}>
                                <Image width={24} height={24} style={{ width: 24, height: 24 }} src={WhatsappIcon} alt='contact' />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={open ? styles.navlistOpen : styles.navlist}>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/'}><div className={styles.navlistItem}>{glosary.link_2}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/about'}><div className={styles.navlistItem}>{glosary.link_1}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/services'}><div className={styles.navlistItem}>{glosary.link_3}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/immo'}><div className={styles.navlistItem}>{'Libling Immo'}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/contact'}><div className={styles.navlistItem}>{glosary.link_4}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/services?member=1'}><div className={styles.navlistItem}>{glosary.link_6}</div></Link>
                <Link onClick={()=>{setOpen(state => !state)}} href={'/services?member=2'}><div className={styles.navlistItem}>{glosary.link_7}</div></Link>
                <div className={styles.navlistItem}>
                    <LanguageSelector lang={lang} />
                </div>
            </div>
        </>
    )
}
