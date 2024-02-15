'use client'
import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import { CountrySelector } from '@/app/components/countrySelector'
import { authenticate } from '@/app/actions'
import { dict } from '@/app/utils'

const Login = ({ params }: { params: { lang: "es" | "en" | "fr" } }) => {
    const [errorMessage, setErrorMessage] = useState<string|null>(null)
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
        const response = await authenticate(undefined,formData)
        setErrorMessage(response || null)
    }
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <CountrySelector lang={lang} />
                {
                    !!errorMessage &&
                    <span className={styles.errorMessage}>{errorMessage}</span>
                }
                <h3>{glosary.login_title}</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formControl}>
                        <label htmlFor="emailInput">{glosary.login_email}</label>
                        <input id='emailInput' name='email' type="email" ref={emailRef} />
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="passwordInput">{glosary.login_password}</label>
                        <input id='passwordInput' name='password' type="password" ref={passwordRef} />
                    </div>
                    <button className={styles.button} type="submit">
                        {glosary.login_button}
                    </button>
                </form>
                <a href="#">{glosary.login_forgot}</a>
            </div>
        </section>
    )
}

export default Login