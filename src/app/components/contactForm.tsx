'use client'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useRef } from 'react'
import { dict } from '../utils'
import { ILang } from '../interfaces'
import * as Yup from 'yup';
import styles from './contactForm.module.css'
import { InputText } from './admin/inputText';
import { poppinsMedium } from '../fonts';


interface IValues {
    name?: string
    email?: string
}
const ContactForm = ({lang} : ILang) => {
    const glosaryContact = dict[lang]?.contact
    const glosaryAdmin = dict[lang]?.adminProperties
    const glosary = dict[lang]?.immo
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formRef}
            enableReinitialize
        >
            {({ values, handleChange, errors, touched, handleSubmit, isSubmitting }) => (
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
    )
}

export default ContactForm