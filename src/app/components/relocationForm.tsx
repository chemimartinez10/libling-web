"use client"
import { StaticImageData } from 'next/image'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import styles from './relocationForm.module.css'
import { poppinsBold, poppinsMedium, poppinsRegular } from '../fonts'
import { dict } from '../utils'
import { subjects, templates } from '../utils/funtions'
import { useSearchParams } from 'next/navigation'
import CustomToast from './toast'
import { toast } from 'react-toastify'
import { sendEmailToOwner, sendInfo, sendEmailToClient } from '../utils/emails'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup';
import { InputText } from './admin/inputText'
import { InputTextArea } from './admin/inputTextArea'
import InputSelect from './admin/inputSelect'
import { Button } from './admin/button'

interface IRelocationForm {
    title?: string
    description?: string
    img?: StaticImageData
    alt?: string
    lang: "es" | "en" | "fr"
}
interface IValues {
    name?: string
    email?: string
    subject?: string
    message?: string
}

const RelocationForm: React.FC<IRelocationForm> = ({ lang }) => {
    const glosary = dict[lang]?.contact
    const glosaryHome = dict[lang]?.home
    const glosaryAdmin = dict[lang]?.adminProperties
    const glosaryImmo = dict[lang]?.immo
    const mailMessages = dict[lang]?.mail
    const query = useSearchParams()
    
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputSubject, setInputSubject] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState<boolean | undefined>(false);

    const formRef = useRef<FormikProps<IValues>>(null)
    const initialValues: IValues = {
        name: '',
        email: '',
        subject: '',
        message: '',

    }
    const validationSchema = Yup.object({
        name: Yup.string().required(glosaryAdmin.formValidationRequired),
        email: Yup.string().email(glosaryAdmin.formValidationEmail).required(glosaryAdmin.formValidationRequired),
        subject: Yup.string().required(glosaryAdmin.formValidationRequired),
        message: Yup.string().optional(),
    });
    const handleSubject = (key: string) => {
        console.log('selected key', key)
        formRef.current?.setFieldValue('subject', key)
    }
    const handleSubmit = async (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        if (loading) { return }
        console.log(values)
        try {
            setLoading(true)
            await sendEmailToClient(
                values.email || 'email',
                templates.infoClient(glosaryHome.bigTitleHeader1_1 + glosaryHome.bigTitleHeader1_2, values.name || '', lang),
                mailMessages.subject_3
            )
            await sendEmailToOwner(
                values.email || 'email',
                templates.info(glosaryHome.bigTitleHeader1_1 + glosaryHome.bigTitleHeader1_2, values.name || '', values.message || '', lang),
                glosary.formSubjectList.find(el=>el.key === values.subject)?.value || glosary.formSubjectList[0]?.value
            )
            toast.success(<CustomToast type='success' title={glosaryImmo.success} content={glosaryImmo.successEmail} />, { theme: 'colored', icon: false, style: { backgroundColor: '#00C851', maxWidth: 450, padding: 24, borderRadius: 10 } })
            formRef?.current?.resetForm({values:{...initialValues, subject:values.subject}})
            
        } catch (error) {
            console.error(error)
            toast.error(<CustomToast type='error' title='Error' content={glosaryImmo.failEmail} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        } finally{
            setLoading(false)
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
        formRef.current?.setFieldValue('subject', initialSubject)
        formRef.current?.setFieldValue('message', initialMessage)
    },[query])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formRef}
            enableReinitialize
        >
            {({ values, handleChange, errors, touched }) => (
                <Form className={styles.card}>
                    <InputText label={glosary.formLabelName} name='name' placeholder={glosary.formPlaceholderName} value={values.name} error={errors.name} touched={touched.name} onChange={handleChange('name')} />
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <InputSelect label={glosary.formLabelSubject} placeholder={glosary.formPlaceholderSubject} list={glosary.formSubjectList} onChange={handleSubject} error={errors.subject} touched={touched.subject} initialValue={values.subject} />
                        </div>
                        <div className={styles.column}>
                            <InputText label={glosary.formLabelEmail} name='email' placeholder={glosary.formPlaceholderEmail} value={values.email} error={errors.email} touched={touched.email} onChange={handleChange('email')} />
                        </div>
                    </div>
                    <InputTextArea label={glosary.formLabelMessage} placeholder={glosary.formPlaceholderMessage} onChange={handleChange('message')} value={values.message} error={errors.message} touched={touched.message} />
                    <div className={styles.buttonContainer}>
                    <button className={styles.button} style={poppinsMedium.style} disabled={loading}>
                        {glosary.formActionButton}
                    </button>
                    <Button title={'Whatsapp'} type='outline'
                            icon='ws' goTo={`https://api.whatsapp.com/send?phone=${352691367757}`}/>

                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RelocationForm