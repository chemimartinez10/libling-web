'use client'
import React, { useEffect, useState } from 'react'
import { InputRadio } from '@/app/components/admin/inputRadio'
import 'maplibre-gl/dist/maplibre-gl.css';
import { toast } from 'react-toastify';
import InputSelect from '@/app/components/admin/inputSelect'
import { poppinsMedium } from '@/app/fonts'
import styles from './page.module.css'
import { dict } from '@/app/utils';
import { IPage } from '../../layout';
import CustomToast from '@/app/components/toast'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { Button } from '@/app/components/admin/button'
import { InputText } from '@/app/components/admin/inputText'


interface IValues {
    email: string
}
interface IStepTwo extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}



const StepTwo: React.FC<IStepTwo> = ({ params: { lang }, onNext, onBack }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const mediosCalefaccion = [
        {
            key: 1,
            value: "Individual",
        },
        {
            key: 2,
            value: "Colectivo",
        },

    ];
    const combustiblesCalefaccion = [
        {
            key: 1,
            value: "Gas natural",
        },
        {
            key: 2,
            value: "Gasóleo",
        },
        {
            key: 3,
            value: "Propano",
        },
        {
            key: 4,
            value: "Leña",
        },
        {
            key: 5,
            value: "Pellet",
        },
        {
            key: 6,
            value: "Biomasa",
        },
        {
            key: 7,
            value: "Electricidad",
        },
        {
            key: 8,
            value: "Energía solar térmica",
        },
        {
            key: 9,
            value: "Aerotermia",
        },
        {
            key: 10,
            value: "Geotermia",
        },
    ];

    const mecanismosCalefaccion = [
        {
            key: 1,
            value: "Radiadores",
        },
        {
            key: 2,
            value: "Suelo radiante",
        },
        {
            key: 3,
            value: "Convectores",
        },
        {
            key: 4,
            value: "Emisores térmicos",
        },
        {
            key: 5,
            value: "Chimeneas",
        },
        {
            key: 6,
            value: "Bombas de calor",
        },
        {
            key: 7,
            value: "Sistemas de aerotermia",
        },
        {
            key: 8,
            value: "Sistemas de geotermia",
        },
        {
            key: 9,
            value: "Paneles solares térmicos",
        },
        {
            key: 10,
            value: "Estufas de pellet",
        },
    ];
    const handleHeatingType = (key: string) => {
        console.log('selected key', key)
    }
    const handleHeatingMedium = (key: string) => {
        console.log('selected key', key)
    }
    const handleHeatingEnergy = (key: string) => {
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
    const AreaIcon = () => (<span className={styles.textIcon}>m{"\u00B2"}</span>)
    useEffect(() => {
    }, [])
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_2}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.cardContent}>
                            <div className={styles.inputRow}>
                                <div className={styles.inputRowHalf}>
                                    <InputText label={glosary.formLabelArea} placeholder={glosary.formPlaceholderText} Icon={AreaIcon} />
                                </div>
                                <div className={styles.inputRowHalf}>
                                    <InputText label={glosary.formLabelBedrooms} placeholder={glosary.formPlaceholderText} />
                                </div>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputRowHalf}>
                                    <InputText label={glosary.formLabelBathrooms} placeholder={glosary.formPlaceholderText} />
                                </div>
                                <div className={styles.inputRowHalf}>
                                    <InputSelect label={glosary.formLabelHeatingType} description={glosary.formLabelOptional} placeholder={glosary.formPlaceholderSelect} list={mecanismosCalefaccion} onChange={handleHeatingType} />
                                </div>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputRowHalf}>
                                    <InputSelect label={glosary.formLabelHeatingMedium} description={glosary.formLabelOptional} placeholder={glosary.formPlaceholderSelect} list={mediosCalefaccion} onChange={handleHeatingMedium} />
                                </div>
                                <div className={styles.inputRowHalf}>
                                    <InputSelect label={glosary.formLabelHeatingEnergy} description={glosary.formLabelOptional} placeholder={glosary.formPlaceholderSelect} list={combustiblesCalefaccion} onChange={handleHeatingEnergy} />
                                </div>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputRowHalf}>
                                    <InputRadio label={glosary.formLabelFurnished} option_1={glosary.formOptionYes} option_2={glosary.formOptionNo} />
                                </div>
                                <div className={styles.inputRowHalf}>

                                </div>

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

export default StepTwo