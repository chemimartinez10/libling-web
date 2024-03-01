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
import { FiPlus } from 'react-icons/fi';


interface IValues {
    email: string
}
interface IStepThree extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}
const medidasAreaTerrenos = [
    { key: 1, value: "m²" },
    { key: 2, value: "ha" },
    { key: 3, value: "km²" },
    { key: 4, value: "acre" },
];



const StepThree: React.FC<IStepThree> = ({ params: { lang }, onNext, onBack }) => {
    const glosary = dict[lang]?.adminProperties
    const glosaryError = dict[lang]?.auth
    const [areaList, setAreaList] = useState<ISelectElement[]>(medidasAreaTerrenos)

    const handleAreaSelect = (key: string) => {
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
    useEffect(() => {
    }, [])
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_3}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, handleChange, errors, touched }) => (
                        <Form className={styles.cardContentBig}>
                            <InputText label={glosary.formLabelView} placeholder={glosary.formPlaceholderView} />
                            <div className={styles.multiFormControl}>
                                <h4 className={styles.multiFormLabel} style={poppinsMedium.style}>{glosary.formLabelSufaces}{" "} <span className={styles.multiFormLabelDescription}>({glosary.formLabelOptional})</span> </h4>
                                <div className={styles.inputRow}>
                                    <InputText placeholder={glosary.formPlaceholderSurfaces_1} />
                                    <div >
                                        <InputText placeholder={glosary.formPlaceholderSurfaces_2} />
                                    </div>
                                    <div style={{}}>
                                        <InputText placeholder={glosary.formPlaceholderSurfaces_3} />

                                    </div>
                                    <div style={{}}>
                                        <InputSelect placeholder={glosary.formPlaceholderSelect} list={areaList} onChange={handleAreaSelect} />

                                    </div>
                                </div>
                                <div className={styles.buttonTopPadding}>
                                    <Button Icon={FiPlus} title={glosary.formButtonAddSurfaces} type='tonal' />
                                </div>
                            </div>
                            <div className={styles.multiFormControl}>
                                <h4 className={styles.multiFormLabel} style={poppinsMedium.style}>{glosary.formLabelBenefits}{" "} <span className={styles.multiFormLabelDescription}>({glosary.formLabelOptional})</span> </h4>
                                <InputText placeholder={glosary.formPlaceholderBenefits} />
                                <div className={styles.buttonTopPadding}>
                                    <Button Icon={FiPlus} title={glosary.formButtonAddBenefits} type='tonal' />
                                </div>
                            </div>
                            <div className={styles.multiFormControl}>
                                <h4 className={styles.multiFormLabel} style={poppinsMedium.style}>{glosary.formLabelNearPlaces}{" "} <span className={styles.multiFormLabelDescription}>({glosary.formLabelOptional})</span> </h4>
                                <InputText placeholder={glosary.formPlaceholderNearPlaces} />
                                <div className={styles.buttonTopPadding}>
                                    <Button Icon={FiPlus} title={glosary.formButtonAddNearPlaces} type='tonal' />
                                </div>
                            </div>
                            <div className={styles.multiFormControl}>
                                <h4 className={styles.multiFormLabel} style={poppinsMedium.style}>{glosary.formLabelLegalNotes}{" "} <span className={styles.multiFormLabelDescription}>({glosary.formLabelOptional})</span> </h4>
                                <InputText placeholder={glosary.formPlaceholderLegalNotes} />
                                <div className={styles.buttonTopPadding}>
                                    <Button Icon={FiPlus} title={glosary.formButtonAddLegalNotes} type='tonal' />
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