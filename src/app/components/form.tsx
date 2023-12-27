"use client"
import Image, { StaticImageData } from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import styles from './form.module.css'
import Button from './button'
import { poppinsBold, poppinsRegular } from '../fonts'
import { dict } from '../utils'
import emailjs from '@emailjs/browser';
import { sendEmail } from '../utils/funtions'
import { useSearchParams } from 'next/navigation'


interface IContactForm {
    title?: string
    description?: string
    img?: StaticImageData
    alt?: string
    lang: "es" | "en" | "fr"
}

const ContactForm: React.FC<IContactForm> = ({ lang }) => {
    const glosary = dict[lang]?.contact
    const mailMessages = dict[lang]?.mail
    const query = useSearchParams()
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputSubject, setInputSubject] = useState(query.get('pack') ? mailMessages.subject_2 : '');
    const [inputMessage, setInputMessage] = useState(query.get('pack') ? `${mailMessages.package} ${query.get('pack')}` : '');
    const [loading, setLoading] = useState<boolean | undefined>();

    const handleSubmit = async (event: SyntheticEvent) => {
        if (loading) { return }
        event.preventDefault()
        setLoading(true)
        const templateParams = {
            reply_to: inputValue,
            from_name: inputName,
            subject: inputSubject,
            message: inputMessage
        };
        console.log(templateParams)
        await sendEmail(templateParams, lang)
        setLoading(undefined)
        setInputValue('')
        setInputMessage('')
        setInputName('')
        setInputSubject('')
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit} id='contactForm'>
            <div className={styles.formControl}>
                <label htmlFor="nameInput" style={poppinsBold.style}>{glosary.form_name}</label>
                <input type="text" id='nameInput' style={poppinsRegular.style} value={inputName} disabled={loading}
                    onChange={(e) => setInputName(e.target.value)} required />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="subjectInput" style={poppinsBold.style}>{glosary.form_subject}</label>
                <input type="text" id='subjectInput' style={poppinsRegular.style} value={inputSubject} disabled={loading}
                    onChange={(e) => setInputSubject(e.target.value)} required />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="emailInput" style={poppinsBold.style}>{glosary.form_email}</label>
                <input id='emailInput' type="text" style={poppinsRegular.style} value={inputValue} disabled={loading}
                    onChange={(e) => setInputValue(e.target.value)} required />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="messageInput" style={poppinsBold.style}>{glosary.form_message}</label>
                <textarea name="" id="messageInput" cols={30} rows={10} value={inputMessage} disabled={loading}
                    onChange={(e) => setInputMessage(e.target.value)} style={poppinsRegular.style} required></textarea>

            </div>
            <Button text={glosary.form_button} disabled={loading} />


        </form>
    )
}

export default ContactForm