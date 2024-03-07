'use client'
import Link from 'next/link'
import React, { SyntheticEvent, useState } from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import luxemburgImg from '../img/Capa_1.png'
import { poppinsBold, poppinsMedium, poppinsRegular, poppinsSemiBold } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { dict } from '../utils'
import { sendEmail } from '../utils/funtions'
import { InputText } from './admin/inputText'


export default function Footer({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.footer
    const glosaryForms = dict[lang]?.adminProperties
    const glosaryAuth = dict[lang]?.auth
    const glosaryContact = dict[lang]?.contact
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
    return (<>
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.contactInfo} style={{ maxWidth: 450 }}>
                    <h3 style={poppinsSemiBold.style}>{glosary.title_1}</h3>
                    <p>
                        Email: info@libling.lu
                        <br />
                        Autorisation n°10154859/0 /RCS B278845/TVA: LU35451932
                        <br />
                        Advice - Management and Relocation to Luxembourg
                        <br />
                        Libling Solutions for you!

                    </p>

                </div>
                {/* <div className={styles.luxemburgContainer}>
                    <Image src={luxemburgImg} alt='madeInLuxemburg' width={96} height={77} />
                    
                </div> */}
                <div className={styles.contactInfo} style={{ maxWidth: 450 }}>
                    <h4 style={{ ...poppinsMedium.style, maxWidth: 300, padding: 0 }} >{glosary.title_2}</h4>
                    <form onSubmit={handleSubmit} className={styles.formEmail}>
                        <div className={styles.formControl}>
                            <label htmlFor="emailInput" style={poppinsMedium.style} className={styles.label}>{glosaryAuth.login_email}</label>
                            <div className={styles.inputContainer}>
                                <input type="email" name="some" id="emailInput" placeholder={glosaryForms.formPlaceholderText} className={styles.input} value={inputValue} disabled={loading} style={poppinsRegular.style}
                                    onChange={(e) => setInputValue(e.target.value)} required />
                            </div>
                        </div>
                        <button disabled={loading} style={poppinsMedium.style}>{glosaryContact.form_button}</button>
                    </form>
                    <div className={styles.socialContainer} style={{ maxWidth: 300 }}>
                        <h5 style={poppinsMedium.style}>{glosary.title_3}</h5>
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
        </div>
        <div className={styles.bottomRibbon}>
            <div className={styles.ribbonHalf}>
                <span className={styles.ribbonText}>{`© Libling 2024 | ${glosary.rights}.`}</span>
            </div>
            <div className={styles.ribbonHalf}>
                <span className={styles.ribbonTextFaded}>{glosary.cookies}</span>
                <span className={styles.ribbonTextFaded}>{glosary.privacy}</span>
                <span className={styles.ribbonTextFaded}>{glosary.terms}</span>
            </div>
        </div>
    </>
    )
}
