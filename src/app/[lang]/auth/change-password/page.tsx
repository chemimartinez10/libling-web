'use client'
import React from 'react';
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

interface IValues {
    password: string
    passwordConfirmation: string
}

const ChangePassword = ({ params }: { params: { lang: "es" | "en" | "fr" } }) => {
    const lang = params.lang
    const glosary = dict[lang]?.auth
    const router = useRouter()
    const validationSchema = Yup.object({
        password: Yup.string().required(glosary.login_password_required),
        passwordConfirmation: Yup.string().required(glosary.login_password_confirmation_required).nonNullable()
            .oneOf([Yup.ref('password')], glosary.login_password_confirmation_required)
    });
    const handleSubmit = (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        toast.error(<CustomToast type='error' title='Error' content={glosary.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        setSubmitting(false)
    }

    return (
        <section className={styles.section}>
            <LogoSVG />
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.title} style={poppinsMedium.style}>{glosary.change_password_title}</h2>
                    <h4 className={styles.subtitle} style={poppinsRegular.style}>{glosary.change_password_subtitle}</h4>
                </div>
                <Formik
                    initialValues={{ password: '', passwordConfirmation: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.form}>
                            
                            <InputPassword label={glosary.login_password} placeholder={glosary.login_placeholder} value={values.password} onChange={handleChange('password')} error={errors.password} touched={touched.password} />
                            <InputPassword label={glosary.login_password_confirm} placeholder={glosary.login_placeholder} value={values.passwordConfirmation} onChange={handleChange('passwordConfirmation')} error={errors.passwordConfirmation} touched={touched.passwordConfirmation} />
                            <Button title={glosary.formButtonChangePassword} loading={isSubmitting} />
                            <Button title={glosary.formButtonOrLogin} type='text' onClick={()=>{router.push('/auth/login')}} />
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default ChangePassword;