'use client'
import React, { useRef, useState } from 'react'
import styles from './contactSection.module.css'
import { dict } from '../utils'
import { poppinsMedium, poppinsSemiBold } from '../fonts'
import { InputText } from './admin/inputText'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup';


interface IValues {
    name?: string
    email?: string
}

const ContactSection = ({ lang }: { lang: "es" | "en" | "fr" }) => {
    const glosary = dict[lang]?.immo
    const glosaryAdmin = dict[lang]?.adminProperties
    const glosaryContact = dict[lang]?.contact
    const formRef = useRef<FormikProps<IValues>>(null)
    const initialValues: IValues = {
        name: '',
        email: '',

    }
    const validationSchema = Yup.object({
        name: Yup.string().required(glosaryAdmin.formValidationRequired),
        email: Yup.string().email(glosaryAdmin.formValidationEmail).required(glosaryAdmin.formValidationRequired),
    });
    const handleSubmit = async (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        console.log(values)
    }
    return (
        <section className={styles.contactSection}>
            <div className={styles.innerContactSection}>
                <div className={styles.contactTextContainer}>
                    <h3 className={styles.contactTitle} style={poppinsSemiBold.style}>{glosary.contactTitle}</h3>
                    <p className={styles.contactDescription}>{glosary.contactDescription}</p>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    innerRef={formRef}
                    enableReinitialize
                >
                    {({ values, handleChange, errors, touched , handleSubmit, isSubmitting}) => (
                        <Form className={styles.card}>
                            <h4 className={styles.formTitle} style={poppinsMedium.style}>{glosary.contactFormTitle}</h4>
                            <InputText label={glosaryContact.form_name} name='name' placeholder={glosaryAdmin.formPlaceholderText} value={values.name} error={errors.name} touched={touched.name} onChange={handleChange('name')} />
                            <InputText label={glosaryContact.form_email} name='email' placeholder={glosaryAdmin.formPlaceholderText} value={values.email} error={errors.email} touched={touched.email} onChange={handleChange('email')} />
                            <button className={styles.button} style={poppinsMedium.style}>
                                {glosary.contactFormButton}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default ContactSection