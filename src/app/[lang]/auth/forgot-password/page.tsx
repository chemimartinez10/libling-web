'use client'
import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { dict } from '@/app/utils';
import CustomToast from '@/app/components/toast';
import { toast } from 'react-toastify';
import { InputText } from '@/app/components/admin/inputText';
import styles from './page.module.css'
import { Button } from '@/app/components/admin/button';
import LogoSVG from '@/app/components/icons/logoSVG';
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import { InputPassword } from '@/app/components/admin/inputPassword';
import { useRouter } from 'next/navigation';
import { FiMail } from 'react-icons/fi';

interface IValues {
    email: string
}

const ForgotPassword = ({ params }: { params: { lang: "es" | "en" | "fr" } }) => {
    const lang = params.lang
    const glosary = dict[lang]?.auth
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const router = useRouter()

    const validationSchema = Yup.object({
        email: Yup.string().email(glosary.email_send_validation).required(glosary.email_send_required),
    });
    const handleSubmit = (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        toast.error(<CustomToast type='error' title='Error' content={glosary.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        setSubmitting(false)
        setFail(true)
    }

    return (
        <section className={styles.section}>
            <LogoSVG />
            {
                (!success && !fail)
                    ?
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.title} style={poppinsMedium.style}>{glosary.forgot_password_title}</h2>
                            <h4 className={styles.subtitle} style={poppinsRegular.style}>{glosary.forgot_password_subtitle}</h4>
                        </div>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values, handleChange, errors, touched }) => (
                                <Form className={styles.form}>

                                    <InputText label={glosary.login_email} placeholder={glosary.login_placeholder} value={values.email} onChange={handleChange('email')} error={errors.email} touched={touched.email} />
                                    <Button title={glosary.formButtonSendLink} loading={isSubmitting} />
                                    <Button title={glosary.formButtonReturn} type='text' onClick={() => { router.back() }} />
                                </Form>
                            )}
                        </Formik>
                    </div>
                    :
                    (success && !fail)
                        ?
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <FiMail className={styles.icon} />
                                <h2 className={styles.title} style={poppinsMedium.style}>{glosary.email_send_title}</h2>
                                <h4 className={styles.subtitle} style={poppinsRegular.style}>{glosary.email_send_subtitle}</h4>
                            </div>
                            <Button title={glosary.formButtonReturn} type='text' onClick={() => { router.back() }} />
                        </div>
                        :
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <FiMail className={styles.icon} />
                                <h2 className={styles.title} style={poppinsMedium.style}>{glosary.email_not_found_title}</h2>
                                <h4 className={styles.subtitle} style={poppinsRegular.style}>{glosary.email_not_found_subtitle}</h4>
                            </div>
                            <Button title={glosary.formButtonReturn} type='text' onClick={() => {
                                setFail(false)
                                setSuccess(false)
                            }} />
                        </div>
            }

        </section>
    );
}

export default ForgotPassword;