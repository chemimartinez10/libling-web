'use client'
import Link from 'next/link'
import React, { SyntheticEvent, useState } from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import luxemburgImg from '../img/Capa_1.png'
import { poppinsBold, poppinsMedium } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { dict } from '../utils'
import { sendEmail } from '../utils/funtions'


export default function Footer({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.footer
    const mailMessages = dict[lang]?.mail
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState<boolean | undefined>();


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
    const handleSubmit = async (event: SyntheticEvent) => {
        if (loading) { return }
        event.preventDefault()
        setLoading(true)
        const templateParams = {
            reply_to: inputValue,
            from_name: inputValue,
            subject: mailMessages.subject_1,
            message: mailMessages.main
        };
        await sendEmail(templateParams, lang)
        setLoading(undefined)
        setInputValue('')
    }
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.contactInfo}>
                    <h4 style={poppinsBold.style}>{glosary.title_1}</h4>
                    <p>
                        <span style={poppinsMedium.style}>Email: </span>info@libling.lu
                        <br />
                        Autorisation n°10154859/0 /RCS B278845
                        <br />
                        Advice - Management and Relocation to Luxembourg 🇱🇺
                        <br />
                        Libling Solutions for you! 🤍

                    </p>

                </div>
                {/* <div className={styles.luxemburgContainer}>
                    <Image src={luxemburgImg} alt='madeInLuxemburg' width={96} height={77} />

                </div> */}
                <div className={styles.contactInfo}>
                    <h4 style={poppinsBold.style}>{glosary.title_2}</h4>
                    <form onSubmit={handleSubmit} className={styles.formEmail}>
                        <input type="email" name="some" id="" value={inputValue} disabled={loading}
                            onChange={(e) => setInputValue(e.target.value)} required />
                        <button disabled={loading}><IoMdSend /></button>
                    </form>
                    <div className={styles.socialContainer}>
                        <h4 style={poppinsBold.style}>{glosary.title_3}</h4>
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
