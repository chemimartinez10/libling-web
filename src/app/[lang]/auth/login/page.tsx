'use client'
import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import { CountrySelector } from '@/app/components/countrySelector'
import { authenticate } from '@/app/actions'
import { dict } from '@/app/utils'
import LogoSVG from '@/app/components/icons/logoSVG'
import { poppinsMedium, poppinsRegular } from '@/app/fonts'

const Login = ({ params }: { params: { lang: "es" | "en" | "fr" } }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const lang = params.lang
    const glosary = dict[lang]?.auth
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        if (email) formData.append('email', email)
        if (password) formData.append('password', password)
        const response = await authenticate(undefined, formData)
        setErrorMessage(response || null)
    }
    return (
        <section className={styles.section}>
            <LogoSVG />
            <div className={styles.card}>
                <CountrySelector lang={lang} />
                {
                    !!errorMessage &&
                    <span className={styles.errorMessage}>{errorMessage}</span>
                }
                <div className={styles.cardHeader}>
                    <h2 className={styles.title} style={poppinsMedium.style}>{glosary.login_title}</h2>
                    <h4 className={styles.subtitle} style={poppinsRegular.style}>{glosary.login_title}</h4>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formControl}>
                        <label htmlFor="emailInput" style={poppinsMedium.style}>{glosary.login_email}</label>
                        <div className={styles.inputContainer}>
                            <input id='emailInput' name='email' type="email" ref={emailRef} />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="passwordInput" style={poppinsMedium.style}>{glosary.login_password}</label>
                        <div className={styles.inputContainer}>
                            <input id='passwordInput' name='password' type="password" ref={passwordRef} />
                        </div>
                    </div>
                    <div className={styles.checkboxControl}>
                        <input type="checkbox" id="cboxInput" name="remember_me" />
                        <label htmlFor="cboxInput">{glosary.login_remember}</label>
                    </div>
                    <button className={styles.button} style={poppinsMedium.style} type="submit">
                        {glosary.login_button}
                    </button>
                </form>
                <a href="#" className={styles.buttonOutline} style={poppinsMedium.style}>{glosary.login_forgot}</a>
            </div>
        </section>
    )
}

export default Login