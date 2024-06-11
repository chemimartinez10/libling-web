"use client"
import Image, { StaticImageData } from 'next/image'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from './form.module.css'
import Button from './button'
import { poppinsBold, poppinsRegular } from '../fonts'
import { dict } from '../utils'
import { templates } from '../utils/funtions'
import { useSearchParams } from 'next/navigation'
import CustomToast from './toast'
import { toast } from 'react-toastify'
import { sendEmail } from '../utils/emails'


interface IContactForm {
    title?: string
    description?: string
    img?: StaticImageData
    alt?: string
    lang: "es" | "en" | "fr"
}

const ContactForm: React.FC<IContactForm> = ({ lang }) => {
    const glosary = dict[lang]?.contact
    const glosaryHome = dict[lang]?.home
    const glosaryImmo = dict[lang]?.immo
    const mailMessages = dict[lang]?.mail
    const query = useSearchParams()
    
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputSubject, setInputSubject] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState<boolean | undefined>();

    const handleSubmit = async (event: SyntheticEvent) => {
        if (loading) { return }
        event.preventDefault()
        setLoading(true)
        try{
            await sendEmail(
                inputValue || 'email',
                templates.info(glosaryHome.bigTitleHeader1_1 + glosaryHome.bigTitleHeader1_2,inputValue || '', inputMessage, lang),
                inputSubject
            )
            toast.success(<CustomToast type='success' title={glosaryImmo.success} content={glosaryImmo.successEmail} />, { theme: 'colored', icon: false, style: { backgroundColor: '#00C851', maxWidth: 450, padding: 24, borderRadius: 10 } })
            setInputValue('')
            setInputMessage('')
            setInputName('')
            setInputSubject('')

        }catch(error){
            console.error(error)
            toast.error(<CustomToast type='error' title='Error' content={glosaryImmo.failEmail} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        }finally{
            setLoading(undefined)
        }

    }
    useEffect(() => {
        let initialSubject = ''
        let initialMessage = ''
        if (query.get('pack')) {
            initialSubject = mailMessages.subject_2
            initialMessage = `${mailMessages.package} ${query.get('pack')}`
        }
        if (query.get('date')) {
            initialSubject = mailMessages.subject_1
            initialMessage = `${mailMessages.date} ${query.get('date')}`
        }
        setInputSubject(initialSubject)
        setInputMessage(initialMessage)
    },[query])

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