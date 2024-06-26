'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './payment.module.css'
import globalStyles from '@/app/globals.module.css'
import * as Yup from 'yup';
import ReactModal from 'react-modal'
import { dict } from '../utils'
import { Button } from './admin/button'
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa6'
import { poppinsSemiBold } from '../fonts'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import InputSelect from './admin/inputSelect'
import { InputTextArea } from './admin/inputTextArea'
import { ISelectElement } from '../interfaces'
import { getCountries, getStatesByCode } from '@/services'
import { useStore } from 'zustand';
import { toast } from 'react-toastify';
import CustomToast from './toast';
import { useAffiliateStore } from '../hooks/useAffiliateStore';
import { InputText } from './admin/inputText';
import InputSwitch from './admin/inputSwitch';
import InputSelectButton from './admin/inputSelectButton';
import IconCheck from './icons/iconCheck';
import useWindowDimensions from '../hooks/useWindowDimensions';

interface IPayment {
    open: boolean
    lang: "es" | "en" | "fr"
    closeModal: VoidFunction
    plan?: string | number
    frecuency?: string | number
    changeFrecuency?: (key: number | string) => void
}
interface IPlan {
    id: number;
    title: string;
    content: string;
    list: string[]; // Assuming list is an array of strings
    price: number;
}
interface IValues1 {
    name?: string
    phone?: string
    email?: string
    country?: string
    note?: string
}
interface IValues2 {
    name?: string
    card?: string
    country?: string
    state?: string
    cvc?: string
    postal?: string
    date?: string
}

export const Payment: React.FC<IPayment> = ({ open = false, lang, closeModal, plan = 1, frecuency = 1 }) => {

    const glosary = dict[lang].services
    const glosaryAdmin = dict[lang]?.adminProperties
    const glosaryAuth = dict[lang]?.auth
  const { height, width } = useWindowDimensions();
    const affiliateList = [
        {
            id: 1,
            name: glosary.sectionOption1,
            priceFrecuency: glosary.sectionOptionBy1,
            plans: [
                {
                    id: 1,
                    title: glosary.planTitle1,
                    content: glosary.planContent1,
                    list: glosary.planList1,
                    price: 8.56,
                },
                {
                    id: 2,
                    title: glosary.planTitle2,
                    content: glosary.planContent2,
                    list: glosary.planList2,
                    price: 22.95,
                },
                {
                    id: 3,
                    title: glosary.planTitle3,
                    content: glosary.planContent3,
                    list: glosary.planList3,
                    price: 13.40,
                },
            ]
        },
        {
            id: 2,
            name: glosary.sectionOption2,
            priceFrecuency: glosary.sectionOptionBy2,
            plans: [
                {
                    id: 1,
                    title: glosary.planTitle1,
                    content: glosary.planContent1,
                    list: glosary.planList1,
                    price: 47.08,
                },
                {
                    id: 2,
                    title: glosary.planTitle2,
                    content: glosary.planContent2,
                    list: glosary.planList2,
                    price: 126.25,
                },
                {
                    id: 3,
                    title: glosary.planTitle3,
                    content: glosary.planContent3,
                    list: glosary.planList3,
                    price: 73.7,
                },
            ]
        },
        {
            id: 3,
            name: glosary.sectionOption3,
            priceFrecuency: glosary.sectionOptionBy3,
            plans: [
                {
                    id: 1,
                    title: glosary.planTitle1,
                    content: glosary.planContent1,
                    list: glosary.planList1,
                    price: 85.6,
                },
                {
                    id: 2,
                    title: glosary.planTitle2,
                    content: glosary.planContent2,
                    list: glosary.planList2,
                    price: 229.5,
                },
                {
                    id: 3,
                    title: glosary.planTitle3,
                    content: glosary.planContent3,
                    list: glosary.planList3,
                    price: 134.0,
                },
            ]
        },
    ]
    const listFrecuency = [
        {
            key: 1,
            value: glosary.sectionOption1,
            priceFrecuency: glosary.sectionOptionBy1,

        },
        {
            key: 2,
            value: glosary.sectionOption2,
            priceFrecuency: glosary.sectionOptionBy2,

        },
        {
            key: 3,
            value: glosary.sectionOption3,
            priceFrecuency: glosary.sectionOptionBy3,
        },
    ]
    const plans :ISelectElement[] = [
        {
            key: 1,
            value: glosary.planTitle1,
            description: glosary.planContent1,
        },
        {
            key: 2,
            value: glosary.planTitle2,
            description: glosary.planContent2,
        },
        {
            key: 3,
            value: glosary.planTitle3,
            description: glosary.planContent3,
        }
    ]

    const steps = [
        {
            index: 1,
            text: glosary.formPageLabel_1
        },
        {
            index: 2,
            text: glosary.formPageLabel_2
        },
    ]
    const [page, setPage] = useState(1)
    const [countries, setCountries] = useState<ISelectElement[]>([])
    const [lastCode, setLastCode] = useState<string>()
    const [states, setStates] = useState<ISelectElement[]>([])
    const [planSelected, setPlanSelected] = useState<IPlan| undefined>()
    const [frecuencySelected, setFrecuencySelected] = useState<number| string>(frecuency)
    const formRef_1 = useRef<FormikProps<IValues1>>(null)
    const formRef_2 = useRef<FormikProps<IValues2>>(null)
    const store = useStore(useAffiliateStore, (state) => state)
    const phoneRegExp = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g
    const initialValues_1: IValues1 = {
        country: store?.form_1?.country,
        email: store?.form_1?.email,
        name: store?.form_1?.name,
        phone: store?.form_1?.phone,
        note: store?.form_1?.note,
    }
    const initialValues_2: IValues2 = {
        country: '',
        card: '',
        cvc: '',
        date: '',
        name: '',
        postal: '',
        state: ''
    }
    const onSubmit1 = () => {
        console.log(formRef_1.current)
        formRef_1.current?.handleSubmit()
    }
    const onSubmit2 = () => {
        console.log(formRef_2.current)
        formRef_2.current?.handleSubmit()
    }
    const fetchCountries = async () => {
        const data = await getCountries()
        const newArray = data?.map(el => ({ key: el.id, value: el.name, extra: el.code }))
        setCountries(newArray || [])
    }
    const fetchStates = async (code: string) => {
        const data = await getStatesByCode(code)
        const newArray = data
        setStates(newArray || [])
    }
    const handleCountry_1 = (key: string) => {
        console.log('selected key', key)
        formRef_1.current?.setFieldValue('country', key)
        const countrySelected = countries.find(el => el.key == key)
        console.log('country selected: ', countrySelected)
        setLastCode(countrySelected?.extra)
    }
    const handleCountry_2 = (key: string) => {
        console.log('selected key', key)
        formRef_2.current?.setFieldValue('country', key)
        const countrySelected = countries.find(el => el.key == key)
        console.log('country selected: ', countrySelected)
        setLastCode(countrySelected?.extra)
    }
    const handleState = (key: string) => {
        console.log('selected key', key)
        formRef_2.current?.setFieldValue('state', key)
    }
    const handlePlan = (key: string|number) => {
        console.log('selected key', key)
        store?.setPlan(key?.toString())
    }
    const handleFrecuency = (key: string|number) => {
        console.log('selected key', key)
        store?.setFrecuency(key)
    }
    const validationSchema_1 = Yup.object({
        name: Yup.string().required(glosaryAdmin.formValidationRequired),
        country: Yup.string().required(glosaryAdmin.formValidationRequired),
        email: Yup.string().email(glosaryAdmin.formValidationEmail).required(glosaryAdmin.formValidationRequired),
        phone: Yup.string().matches(phoneRegExp, glosaryAdmin.formValidationRequired).required(glosaryAdmin.formValidationRequired),
        note: Yup.string().optional(),

    });
    const validationSchema_2 = Yup.object({
        name: Yup.string().required(glosaryAdmin.formValidationRequired),
        card: Yup.string().matches(/^\D*\d{16}$/, glosaryAdmin.formValidationNumbers).required(glosaryAdmin.formValidationRequired),
        cvc: Yup.string().matches(/^\D*\d{3}$/, glosaryAdmin.formValidationCvc).required(glosaryAdmin.formValidationRequired).typeError(glosaryAdmin.formValidationNumbers),
        country: Yup.string().required(glosaryAdmin.formValidationRequired),
        state: Yup.string().required(glosaryAdmin.formValidationRequired),
        postal: Yup.string().matches(/^[\d -]+$/, glosaryAdmin.formValidationRequired).required(glosaryAdmin.formValidationRequired),
        date: Yup.string().matches(/(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/, glosaryAdmin.formValidationCardDate).required(glosaryAdmin.formValidationRequired),

    });
    const handleSubmit_1 = async (values: IValues1, { setSubmitting }: FormikHelpers<IValues1>) => {
        const formData = values
        console.log('formik values', formData)
        try {
            store?.setForm_1(formData)
            setPage(2)
        } catch (e) {
            console.error(e)
            toast.error(<CustomToast type='error' title='Error' content={glosaryAuth.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        } finally {
            setSubmitting(false)

        }
    }
    const handleSubmit_2 = async (values: IValues2, { setSubmitting }: FormikHelpers<IValues2>) => {
        const formData = values
        console.log('formik values', formData)
        try {
            toast.success(<CustomToast type='success' title={glosary.successMessageTitle} content={glosary.successMessageContent} />, { theme: 'colored', icon: false, style: { backgroundColor: '#00C851', maxWidth: 450, padding: 24, borderRadius: 10 } })
            closeModal()
        } catch (e) {
            console.error(e)
            toast.error(<CustomToast type='error' title='Error' content={glosaryAuth.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        } finally {
            setSubmitting(false)

        }
    }
    useEffect(() => {
        fetchCountries()
    }, [])
    useEffect(() => {
        formRef_1.current?.handleReset()
        formRef_2.current?.handleReset()
    }, [page])
    useEffect(() => {
        if (lastCode) {
            fetchStates(lastCode)
        }
    }, [lastCode])
    useEffect(()=>{
        if(open && store?.frecuency && store?.plan){
            setPlanSelected(affiliateList?.find(el => el.id == store?.frecuency)?.plans.find(el => el.id == store?.plan))
        }
    },[store?.frecuency, store?.plan, open])
    return (
        <>
            {
                !!width &&
                <ReactModal isOpen={open} onRequestClose={() => { }} style={{
                    overlay: { backgroundColor: '#00000052', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4 },
                    content: { backgroundColor: '#FFFFFF', padding: 0, borderRadius: 8, boxShadow: '0px 12px 30px 0px #1973FA14', width: width < 800 ? '100vw' : 1050 , position: 'relative', display: 'flex', flexDirection: width < 800 ? 'column-reverse' : 'row', gap: 0, color: '#000000DE', inset: 0, zIndex: 5,height: width < 800 ? '100vh' : undefined , }
                }}>
                    <div className={styles.wizardContainer}>
                        <div className={styles.stepContainer}>
                            {
                                steps.map(el => (
                                    <div key={el.index} className={el.index === page ? styles.stepActive : styles.step}>
                                        <div className={styles.square}></div>
                                        <span className={styles.stepText}>
                                            {el.text}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className={styles.title} style={poppinsSemiBold.style}>
                            {page === 1 ? glosary.formTitle_1 : glosary.formTitle_2}
                        </h3>
                        <div className={styles.formContainer}>
                            <div className={page === 1 ? styles.form_1 : styles.form_2}>
                                <div className={styles.innerForm}>
                                    <Formik
                                        key={1}
                                        initialValues={initialValues_1}
                                        validationSchema={validationSchema_1}
                                        onSubmit={handleSubmit_1}
                                        innerRef={formRef_1}
                                        enableReinitialize
                                    >
                                        {({ isSubmitting, values, handleChange, errors, touched }) => (
                                            <Form className={styles.form}>
                                                <div className={styles.inputRow}>
                                                    <div className={styles.inputColumn}>
                                                        <InputText label={glosary.inputLabel_1} placeholder={glosary.inputPlaceholder_1} error={errors.name} touched={touched.name} value={values.name} onChange={handleChange('name')}
                                                        />
                                                    </div>
                                                    <div className={styles.inputColumn}>
                                                        <InputText label={glosary.inputLabel_2} placeholder={glosary.inputPlaceholder_2} error={errors.phone} touched={touched.phone} value={values.phone} onChange={handleChange('phone')}
                                                        />
                                                    </div>
                                                </div>
                                                <InputText label={glosary.inputLabel_3} placeholder={glosary.inputPlaceholder_3} error={errors.email} touched={touched.email} value={values.email} onChange={handleChange('email')}
                                                />
                                                <InputSelect label={glosary.inputLabel_4} placeholder={glosary.inputPlaceholder_4} list={countries} onChange={handleCountry_1} error={errors.country} touched={touched.country} initialValue={values.country} />
                                                <InputTextArea label={glosary.inputLabel_5} placeholder={glosary.inputPlaceholder_5} error={errors.note} touched={touched.note} value={values.note} onChange={handleChange('note')} />

                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                <div className={styles.innerForm}>
                                    <Formik
                                        key={2}
                                        initialValues={initialValues_2}
                                        validationSchema={validationSchema_2}
                                        onSubmit={handleSubmit_2}
                                        innerRef={formRef_2}
                                        enableReinitialize

                                    >
                                        {({ isSubmitting, values, handleChange, errors, touched }) => (
                                            <Form className={styles.form}>
                                                <InputText label={glosary.inputLabel_6} placeholder={glosary.inputPlaceholder_6} error={errors.card} touched={touched.card} value={values.card} onChange={handleChange('card')}
                                                />
                                                <InputText label={glosary.inputLabel_7} placeholder={glosary.inputPlaceholder_7} error={errors.name} touched={touched.name} value={values.name} onChange={handleChange('name')}
                                                />
                                                <div className={styles.inputRow}>
                                                    <div className={styles.inputColumn}>
                                                        <InputText label={glosary.inputLabel_8} placeholder={glosary.inputPlaceholder_8} error={errors.date} touched={touched.date} value={values.date} onChange={handleChange('date')}
                                                        />
                                                    </div>
                                                    <div className={styles.inputColumn}>
                                                        <InputText label={glosary.inputLabel_9} placeholder={glosary.inputPlaceholder_9} error={errors.cvc} touched={touched.cvc} value={values.cvc} onChange={handleChange('cvc')}
                                                        />
                                                    </div>
                                                </div>

                                                <InputSelect label={glosary.inputLabel_10} placeholder={glosary.inputPlaceholder_10} list={countries} onChange={handleCountry_2} error={errors.country} touched={touched.country} initialValue={values.country} />
                                                <div className={styles.inputRow}>

                                                    <div className={styles.inputColumn}>
                                                        <InputSelect label={glosary.inputLabel_11} placeholder={glosary.inputPlaceholder_11} list={states} onChange={handleState} error={errors.state} touched={touched.state} initialValue={values.state} />
                                                    </div>

                                                    <div className={styles.inputColumn}>
                                                        <InputText label={glosary.inputLabel_12} placeholder={glosary.inputPlaceholder_12} error={errors.postal} touched={touched.postal} value={values.postal} onChange={handleChange('postal')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles.subtotalContainer}>
                                                    <span className={styles.subtotalText}>
                                                        {
                                                            glosary.priceLabel
                                                        }
                                                    </span>
                                                    <span className={styles.subtotalText}>
                                                        {planSelected?.price.toLocaleString('es-es',{minimumFractionDigits: 2})}
                                                        {' €'}
                                                    </span>
                                                </div>
                                                <div className={styles.totalContainer}>
                                                    <span className={styles.totalText} style={poppinsSemiBold.style}>
                                                        {planSelected?.price.toLocaleString('es-es',{minimumFractionDigits: 2})}
                                                        {' €'}
                                                    </span>
                                                    <span className={[globalStyles.smallText,globalStyles.textFaded].join(' ')}>
                                                        {listFrecuency.find(el=>el.key.toString() === store?.frecuency?.toString())?.priceFrecuency}
                                                    </span>
                                                </div>

                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rowButtons}>
                            {
                                page === 1
                                &&
                                <>
                                    <Button title={glosary.buttonAction_1} onClick={closeModal} Icon={FaChevronLeft} type='outline' />
                                    <Button title={glosary.buttonAction_2} grow={true} onClick={onSubmit1} loading={formRef_1.current?.isSubmitting} />
                                </>

                            }
                            {

                                page === 2
                                &&
                                <>
                                    <Button title={glosary.buttonAction_3} Icon={FaChevronLeft} type='outline' onClick={() => { setPage(1) }} />
                                    <Button title={glosary.buttonAction_4} grow={true} loading={formRef_2.current?.isSubmitting} onClick={onSubmit2} />
                                </>
                            }
                        </div>
                    </div>
                    <div className={styles.selectedPlanContainer}>
                        <div className={styles.planContainer}>
                            <FaChevronDown className={styles.closeIcon} onClick={closeModal}/>
                            <h4 className={globalStyles.miniTitle} style={poppinsSemiBold.style}>{glosary.modalTitle}</h4>
                            <div className={styles.titleContainer}>
                                <h2 className={globalStyles.smallMediumTitle} style={poppinsSemiBold.style}>{planSelected?.title}</h2>
                                <span className={globalStyles.smallText}>{planSelected?.content}</span>
                            </div>
                            <InputSelectButton list={plans} title={glosary.buttonAction_5} onChange={handlePlan} lang={lang} loading={false} initialValue={plan} grow={true}/>
                        </div>
                        <InputSwitch list={listFrecuency} initialValue={store?.frecuency} onChange={handleFrecuency} backgroundColor='transparent' grow={true}/>
                        <div className={styles.priceContainer}>
                            <span className={[globalStyles.regularTitle].join(' ')}>
                                {planSelected?.price.toLocaleString('es-es',{minimumFractionDigits: 2})}
                                {' €'}
                            </span>
                            <span className={[globalStyles.regularTitle,globalStyles.textFaded].join(' ')}>
                                {' / '}
                            </span>
                            <span className={[globalStyles.regularTitle,globalStyles.textFaded].join(' ')}>
                                {listFrecuency.find(el=>el.key.toString() === store?.frecuency?.toString())?.priceFrecuency}
                            </span>
                        </div>
                        <ul className={styles.listContainer}>
                            {
                                planSelected?.list.map((el,index)=>(<li className={[styles.listItem].join(' ')} key={index}>
                                    <div className={styles.iconList}>
                                        <IconCheck/>
                                    </div>
                                    <span className={[globalStyles.text].join(' ')}>
                                        {el}
                                    </span>
                                </li>))
                            }
                        </ul>
                    </div>
                </ReactModal>
            }
        </>

    )
}
