'use client'
import React, { useEffect, useState } from 'react'
import { InputTextArea } from '@/app/components/admin/inputTextArea'
import { toast } from 'react-toastify';
import { poppinsMedium } from '@/app/fonts'
import styles from './page.module.css'
import { dict } from '@/app/utils';
import { IPage } from '../../layout';
import { ISelectElement } from '@/app/interfaces'
import CustomToast from '@/app/components/toast'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { Button } from '@/app/components/admin/button'
import { InputText } from '@/app/components/admin/inputText';
import { FiInfo } from 'react-icons/fi';
import InputPhoto from '@/app/components/admin/inputPhoto';


interface IValues {
    email: string
}
interface IStepFour extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}



const StepFour: React.FC<IStepFour> = ({ params: { lang }, onNext, onBack }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const [list, setList] = useState<ISelectElement[]>([])

    const handleTitle = (key: string | React.ChangeEvent<any>) => {
        console.log('selected key', key)
    }
    const validationSchema = Yup.object({
        email: Yup.string().email(glosaryError.email_send_validation).required(glosaryError.email_send_required),
    });
    const handleSubmit = async (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        const formData = values
        try {
            // const response = await authFetch({
            //     endpoint: 'forgot-password',
            //     formData
            // })
        } catch (e) {
            console.error(e)
            toast.error(<CustomToast type='error' title='Error' content={glosaryError.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        } finally {
            setSubmitting(false)

        }
    }
    useEffect(() => {
    }, [])
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_4}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.cardContent}>
                            <InputText label={glosary.formLabelTitle} placeholder={glosary.formPlaceholderSelectText} onChange={handleTitle} />
                            <InputTextArea label={glosary.formLabelDescription} placeholder={glosary.formPlaceholderText} description={glosary.formLabelOptional} />
                            <div className={styles.multiFormControl}>
                                <h4 className={styles.multiFormLabel} style={poppinsMedium.style}>{glosary.formLabelPhotos}</h4>
                                <p className={styles.multiFormDescription}>{glosary.formLabelPhotosDescription}</p>
                                <div className={styles.avertisingContainer}>
                                    <FiInfo className={styles.advertisingIcon} />
                                    <span className={styles.avertisingText}>{glosary.formLabelPhotosAdvertise}</span>
                                </div>
                                <InputPhoto description={glosary.formButtonAddPhoto} facename={glosary.formLabelTumbnail}/>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
            <div className={styles.cardFooter}>
                <Button title={glosary.formButtonBack} type='outline' onClick={onBack} />
                <Button title={glosary.formButtonNext} onClick={onNext} />
            </div>
        </div>
    )
}

export default StepFour