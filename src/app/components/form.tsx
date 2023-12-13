import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './form.module.css'
import Button from './button'
import { poppinsBold } from '../fonts'
import { dict } from '../utils'

interface IContactForm {
    title?: string
    description?: string
    img?: StaticImageData
    alt?: string
    lang: "es" | "en" | "fr"
}

const ContactForm: React.FC<IContactForm> = ({ lang }) => {
    const glosary = dict[lang]?.contact

    return (
        <div className={styles.container}>
            <div className={styles.formControl}>
                <label htmlFor="nameInput" style={poppinsBold.style}>{glosary.form_name}</label>
                <input type="text" id='nameInput' />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="subjectInput" style={poppinsBold.style}>{glosary.form_subject}</label>
                <input type="text" id='subjectInput' />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="emailInput" style={poppinsBold.style}>{glosary.form_email}</label>
                <input id='emailInput' type="text" />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="messageInput" style={poppinsBold.style}>{glosary.form_message}</label>
                <textarea name="" id="messageInput" cols={30} rows={10} ></textarea>

            </div>
            <Button text='Enviar' />


        </div>
    )
}

export default ContactForm