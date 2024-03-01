'use client'
import React, { useEffect, useState } from 'react'
import InputSwitch from '@/app/components/admin/inputSwitch'
import { InputTextArea } from '@/app/components/admin/inputTextArea'
import { toast } from 'react-toastify';
import InputTextSelect from '@/app/components/admin/inputTextSelect'
import { poppinsMedium } from '@/app/fonts'
import styles from './page.module.css'
import { dict } from '@/app/utils';
import { IPage } from '../../layout';
import { createPropertyType, getCountries, getCurrencies, getPropertyTypes } from '@/services'
import { ISelectElement } from '@/app/interfaces'
import CustomToast from '@/app/components/toast'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { Button } from '@/app/components/admin/button'
import InputSelect from '@/app/components/admin/inputSelect';
import { InputText } from '@/app/components/admin/inputText';


interface IValues {
    email: string
}
interface IStepFive extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}



const StepFive: React.FC<IStepFive> = ({ params: { lang }, onNext, onBack }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const [list, setList] = useState<ISelectElement[]>([])
    const [currency, setCurrency] = useState<ISelectElement[]>([])
    const rentPaymentPeriods = [
        { key: 1, value: "mo.", description: "Monthly" },
        { key: 2, value: "bi-wkly", description: "Bi-weekly" },
        { key: 3, value: "qtr.", description: "Quarterly" },
        { key: 4, value: "yr.", description: "Annually" },
      ];
      
    const [periods, setPeriods] = useState<ISelectElement[]>(rentPaymentPeriods)

    const fetchCurrency = async () => {
        const data = await getCurrencies()
        const newArray = data?.map(el => ({ key: el.id, value: el.symbol, description: el.name }))
        setCurrency(newArray || [])
    }
    const handleCurrency = (key: string) => {
        console.log('selected key', key)
    }
    const handleFrecuency = (key: string) => {
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
        fetchCurrency()
    }, [])
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_5}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.cardContent}>
                            <div className={styles.inputRow}>
                                <div className={styles.inputRowHalf}>
                                    <InputSelect label={glosary.formLabelCurrency} placeholder={glosary.formPlaceholderSelectText} list={currency} onChange={handleCurrency} />
                                </div>
                                <div className={styles.inputRowHalf}>
                                    <InputText label={glosary.formLabelPrice} placeholder={glosary.formPlaceholderText} />
                                </div>
                            </div>
                            <InputSelect label={glosary.formLabelFrecuency} placeholder={glosary.formPlaceholderSelectText} list={periods} onChange={handleFrecuency} />

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

export default StepFive