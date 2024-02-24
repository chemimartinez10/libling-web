'use client'
import React, { useEffect, useState } from 'react'
import { InputRadio } from '@/app/components/admin/inputRadio'
import 'maplibre-gl/dist/maplibre-gl.css';
import { getMapStyles } from '@/app/actions'
import { toast } from 'react-toastify';
import InputSelect from '@/app/components/admin/inputSelect'
import { poppinsMedium } from '@/app/fonts'
import styles from './page.module.css'
import { dict } from '@/app/utils';
import { IPage } from '../../layout';
import { createPropertyType, getPropertyTypes } from '@/services'
import { ISelectElement } from '@/app/interfaces'
import CustomToast from '@/app/components/toast'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { Button } from '@/app/components/admin/button'
import { InputText } from '@/app/components/admin/inputText'


interface IValues {
    email: string
}
interface IStepThree extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}



const StepThree: React.FC<IStepThree> = ({ params: { lang }, onNext, onBack }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const [latLng, setLatLng] = useState({ lat: 49.61675, lng: 6.12777 })
    const [mapStyle, setMapStyle] = useState<string | null>(null)
    const [list, setList] = useState<ISelectElement[]>([])
   
    const fetchPropertyTypes = async () => {
        const data = await getPropertyTypes()
        const newArray = data?.map(el => ({ key: el.id, value: el.name }))
        setList(newArray || [])
    }

    const handleSellType = (key: string | number) => {
        console.log(key)
    }
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
        fetchPropertyTypes()
        getMapStyles().then(result => setMapStyle(result))
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

export default StepThree