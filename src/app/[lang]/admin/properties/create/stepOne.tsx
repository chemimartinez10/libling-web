'use client'
import React, { useEffect, useState } from 'react'
import { InputRadio } from '@/app/components/admin/inputRadio'
import InputSwitch from '@/app/components/admin/inputSwitch'
import { InputTextArea } from '@/app/components/admin/inputTextArea'
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getMapStyles } from '@/app/actions'
import Loader from '@/app/components/admin/loader'
import Image from 'next/image'
import pin from '@/app/img/pin.png'
import { toast } from 'react-toastify';
import InputSelect from '@/app/components/admin/inputSelect'
import InputTextSelect from '@/app/components/admin/inputTextSelect'
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


interface IValues {
    email: string
}



const StepOne: React.FC<IPage> = ({ params: { lang } }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const [latLng, setLatLng] = useState({ lat: 49.61675, lng: 6.12777 })
    const [mapStyle, setMapStyle] = useState<string | null>(null)
    const [list, setList] = useState<ISelectElement[]>([])
    const listSwitch = [
        {
            key: 1,
            value: 'Venta',
        },
        {
            key: 2,
            value: 'Alquiler',
        },
    ]
    const fetchPropertyTypes = async () => {
        const data = await getPropertyTypes()
        const newArray = data?.map(el => ({ key: el.id, value: el.name }))
        setList(newArray || [])
    }
    const handleSellType = (key: string | number) => {
        console.log(key)
    }
    const handlePropertyType = (key: string) => {
        console.log('selected key', key)
    }
    const handleAddPropertyType = async (el: string) => {
        const added = await createPropertyType({ name: el, code: el.toUpperCase() })
        console.log('added', added)
        await fetchPropertyTypes()
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
        fetchPropertyTypes()
        getMapStyles().then(result => setMapStyle(result))
    }, [])
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_1}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.cardContent}>
                            <div className={styles.inputRow}>
                                <div className={styles.stepOneInputLeft}>
                                    <InputTextSelect label={glosary.formLabelPropertyType} placeholder={glosary.formPlaceholderSelectText} list={list} lang={lang} onChange={handlePropertyType} onAdd={handleAddPropertyType} />
                                </div>
                                <div className={styles.stepOneInputRight}>
                                    <InputSwitch list={listSwitch} initialValue={1} onChange={handleSellType} />
                                </div>
                            </div>
                            <InputTextArea label={glosary.formLabelAddress} placeholder={glosary.formPlaceholderText} />
                            <div className={styles.mapContainer}>
                                <span className={styles.mapTitle} style={poppinsMedium.style}>{glosary.formLabelMap}</span>
                                {
                                    !!mapStyle ?
                                        <Map
                                            initialViewState={{
                                                longitude: latLng.lng,
                                                latitude: latLng.lat,
                                                zoom: 10
                                            }}
                                            style={{ width: 600, height: 400 }}
                                            mapStyle={mapStyle}
                                        >
                                            <Marker draggable={true} latitude={latLng.lat} longitude={latLng.lng} onDragEnd={(e) => {
                                                console.log(e.lngLat)
                                                setLatLng(e.lngLat)
                                            }}>
                                                <Image width={36} height={36} src={pin} alt='pin' style={{ width: 36, height: 36 }} />
                                            </Marker>
                                        </Map>
                                        :
                                        <div style={{ width: 600, height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Loader color='#000' />
                                        </div>
                                }
                            </div>

                        </Form>
                    )}
                </Formik>
                {/* <InputRadio label={glosary.formLabelFurnished} option_1={glosary.formOptionYes} option_2={glosary.formOptionNo} />
                    <InputSelect label={glosary.formLabelHeatingMedium} placeholder={glosary.formPlaceholderSelect} list={list} onChange={handlePropertyType} /> */}

            </div>
            <div className={styles.cardFooter}>
                <Button title={glosary.formButtonNext}/>
            </div>
        </div>
    )
}

export default StepOne