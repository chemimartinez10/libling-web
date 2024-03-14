import React from 'react'
import styles from './contactSection.module.css'
import { dict } from '../utils'
import { poppinsSemiBold } from '../fonts'
import ContactForm from './contactForm'


const ContactSection = ({ lang }: { lang: "es" | "en" | "fr" }) => {
    const glosary = dict[lang]?.immo

    return (
        <section className={styles.contactSection} id='contact'>
            <div className={styles.innerContactSection}>
                <div className={styles.contactTextContainer}>
                    <h3 className={styles.contactTitle} style={poppinsSemiBold.style}>{glosary.contactTitle}</h3>
                    <p className={styles.contactDescription}>{glosary.contactDescription}</p>
                </div>
                <div className={styles.form}>
                    <ContactForm lang={lang} />
                </div>
            </div>
        </section>
    )
}

export default ContactSection