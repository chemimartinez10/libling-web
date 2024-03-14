'use client'
import React, { SyntheticEvent, useState } from 'react'
import styles from './footer.module.css'
import { poppinsBold, poppinsMedium, poppinsRegular, poppinsSemiBold } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";
import { dict } from '../utils'
import { sendEmail } from '../utils/funtions'


export default function FooterImmo({ lang }: { lang: "es" | "en" | "fr" }) {
    const glosary = dict[lang]?.footer
    const glosaryForms = dict[lang]?.adminProperties
    const glosaryAuth = dict[lang]?.auth
    const glosaryContact = dict[lang]?.contact
    const mailMessages = dict[lang]?.mail
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState<boolean | undefined>();

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
        <div className={styles.footerImmo}>
            <div className={styles.immoIconsContainer}>
                <a className={styles.iconImmo} href="https://www.facebook.com/profile.php?id=61554771181200" >
                    <RiFacebookFill />
                </a>
                <a className={styles.iconImmo} href="https://www.instagram.com/libling_solutions">
                    <RiInstagramFill />
                </a>
                <a className={styles.iconImmo} href="https://www.linkedin.com/company/libling/">
                    <RiLinkedinFill />
                </a>
            </div>
            <p className={styles.immoText} style={poppinsRegular.style}>
                Email: info@libling.lu
                <br />
                Autorisation n°10154859/0 /RCS B278845/TVA: LU35451932
                <br />
                Advice - Management and Relocation to Luxembourg
                <br />
                Libling Solutions for you!

            </p>
        </div>
        <div className={styles.ribbon}>
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
        </div>
    </>
    )
}
