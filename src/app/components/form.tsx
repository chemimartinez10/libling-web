import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './form.module.css'
import Button from './button'

interface IContactForm {
    title?: string
    description?: string
    img?: StaticImageData
    alt?: string
}

const ContactForm: React.FC<IContactForm> = ({ }) => {
    return (
        <div className={styles.container}>
            <div className={styles.formControl}>
                <label htmlFor="nameInput">Nombres</label>
                <input type="text" id='nameInput' />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="subjectInput">Asunto</label>
                <input type="text" id='subjectInput' />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="emailInput">Correo electrónico</label>
                <input id='emailInput' type="text" />

            </div>
            <div className={styles.formControl}>
                <label htmlFor="messageInput">Mensaje</label>
                <textarea name="" id="messageInput" cols={30} rows={10}></textarea>

            </div>
            <Button text='Enviar' />


        </div>
    )
}

export default ContactForm