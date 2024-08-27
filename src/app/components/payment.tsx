'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './payment.module.css'
import globalStyles from '@/app/globals.module.css'
import * as Yup from 'yup';
import ReactModal from 'react-modal'
import { dict } from '../utils'
import { Button } from './admin/button'
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa6'
import { poppinsBold, poppinsMedium, poppinsRegular, poppinsSemiBold } from '../fonts'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import InputSelect from './admin/inputSelect'
import { InputTextArea } from './admin/inputTextArea'
import { ISelectElement } from '../interfaces'
import { createAffiliate, getCountries, getStatesByCode, paymentInitialization, showAffiliate, updateAffiliate } from '@/services'
import { useStore } from 'zustand';
import { toast } from 'react-toastify';
import CustomToast from './toast';
import { useAffiliateStore } from '../hooks/useAffiliateStore';
import { InputText } from './admin/inputText';
import InputSwitch from './admin/inputSwitch';
import InputSelectButton from './admin/inputSelectButton';
import IconCheck from './icons/iconCheck';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Plan } from '@prisma/client';
import { FEE, FEE_MULTIPLY } from '../utils/data';
import Link from 'next/link';

interface IPayment {
    open: boolean
    lang: "es" | "en" | "fr"
    closeModal: VoidFunction
    plan?: string | number
    frecuency?: string | number
    changeFrecuency?: (key: number | string) => void
    initialForm?: number
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
}
interface IValues2 {
    email?: string

}

export const Payment: React.FC<IPayment> = ({ open = false, lang, closeModal, plan = 1, frecuency = 1, initialForm=1 }) => {

    const glosary = dict[lang].services
    const glosaryAdmin = dict[lang]?.adminProperties
    const glosaryAuth = dict[lang]?.auth
    const { height, width } = useWindowDimensions();
    const affiliateList = [
        {
            id:1,
            name:glosary.sectionOption1,
            priceFrecuency:glosary.sectionOptionBy1,
            plans:[
                {
                    id:1,
                    title:glosary.planTitle1,
                    content:glosary.planContent1,
                    list:glosary.planList1,
                    price:8.56,
                },
                {
                    id:2,
                    title:glosary.planTitle2,
                    content:glosary.planContent2,
                    list:glosary.planList2,
                    price:22.95,
                },
                {
                    id:3,
                    title:glosary.planTitle3,
                    content:glosary.planContent3,
                    list:glosary.planList3,
                    price:13.40,
                },
            ]   
        },
        {
            id:2,
            name:glosary.sectionOption2,
            priceFrecuency:glosary.sectionOptionBy2,
            plans:[
                {
                    id: 1,
                    title: glosary.planTitle1,
                    content: glosary.planContent1,
                    list: glosary.planList1Extra,
                    price: 48,
                },
                {
                    id: 2,
                    title: glosary.planTitle2,
                    content: glosary.planContent2,
                    list: glosary.planList2Extra,
                    price: 120,
                },
                {
                    id: 3,
                    title: glosary.planTitle3,
                    content: glosary.planContent3,
                    list: glosary.planList3Extra,
                    price: 68,
                },
            ]   
        },
        {
            id:3,
            name:glosary.sectionOption3,
            priceFrecuency:glosary.sectionOptionBy3,
            plans:[
                {
                    id: 1,
                    title: glosary.planTitle1,
                    content: glosary.planContent1,
                    list: glosary.planList1Extra2,
                    price: 90,
                },
                {
                    id: 2,
                    title: glosary.planTitle2,
                    content: glosary.planContent2,
                    list: glosary.planList2Extra2,
                    price: 220,
                },
                {
                    id: 3,
                    title: glosary.planTitle3,
                    content: glosary.planContent3,
                    list: glosary.planList3Extra2,
                    price: 128,
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
    const getPlanEnum = (id?:number):Plan=>{
        let enumerable = Plan.Student
        if(id === 2) return Plan.JobSeeker
        if(id === 3) return Plan.Business
        console.log('getPlanEnum: ', enumerable)
        return enumerable
    }
    const getFrecuencyDate = (id?:number | string):Date=>{
        let months = 1
        if(id?.toString() === '2') months = 6
        if(id?.toString() === '3') months = 12
        const today = new Date()
        console.log('getFrecuencyDate - Today date: ',today)
        today.setMonth(today.getMonth() + months)
        const expirationDate = new Date(today)
        console.log('getFrecuencyDate - Expire date: ',expirationDate)
        return expirationDate
    }
    const getPlanMonths = (id?:number | string):number=>{
        let months = 1
        if(id?.toString() === '2') months = 6
        if(id?.toString() === '3') months = 12
        return months
    }

    const steps = [
        {
            index: 1,
            text: glosary.formPageLabel_1
        },
        // {
        //     index: 2,
        //     text: glosary.formPageLabel_2
        // },
    ]
    const [page, setPage] = useState(1)
    const [saferpayUrl, setSaferpayUrl] = useState<string|null>()
    const [countries, setCountries] = useState<ISelectElement[]>([])
    const [lastCode, setLastCode] = useState<string>()
    const [states, setStates] = useState<ISelectElement[]>([])
    const [planSelected, setPlanSelected] = useState<IPlan| undefined>(affiliateList?.at(0)?.plans?.at(0))
    const formRef_1 = useRef<FormikProps<IValues1>>(null)
    const formRef_2 = useRef<FormikProps<IValues2>>(null)
    const store = useStore(useAffiliateStore, (state) => state)
    const phoneRegExp = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g
    const initialValues_1: IValues1 = {
        country: store?.form_1?.country,
        email: store?.form_1?.email,
        name: store?.form_1?.name,
        phone: store?.form_1?.phone,
    }
    const initialValues_2: IValues2 = {
        email: store?.form_1?.email
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
        email: Yup.string().email(glosaryAdmin.formValidationEmail).required(glosaryAdmin.formValidationRequired),

    });
    const handleSubmit_1 = async (values: IValues1, { setSubmitting }: FormikHelpers<IValues1>) => {
        const formData = values
        console.log('formik values', formData)
        try {
            store?.setForm_1(formData)
            let affiliateStored = await showAffiliate({email:formData.email})
            let affiliateId
            console.log('there is a previous affiliate ', affiliateStored)
            if(!affiliateStored){
                const newAffiliate = await createAffiliate({
                    email:formData.email || '',
                    name:formData.name || '',
                    phone:formData.phone || '',
                    countryId: !!formData.country ? parseInt(formData.country) : 0,
                    plan:getPlanEnum(planSelected?.id),
                    plan_date:new Date(),
                    status:false,
                })
                console.log('there is a new affiliate ', newAffiliate)
                formRef_1.current?.setFieldValue('id', newAffiliate.id)
                affiliateId = newAffiliate.id
                store.setAffiliateId(newAffiliate.id)
            }else{
                await updateAffiliate({
                    id:affiliateStored.id,
                    name:formData.name || '',
                    phone:formData.phone || '',
                    countryId: !!formData.country ? parseInt(formData.country) : 0,
                    plan:getPlanEnum(planSelected?.id),
                })
                formRef_1.current?.setFieldValue('id', affiliateStored.id)
                affiliateId = affiliateStored.id
                store.setAffiliateId(affiliateStored.id)
            }
            console.log('making a saferpay bank request')
            const response = await paymentInitialization(planSelected?.title || 'Description', planSelected?.price || 100, affiliateId, (window.location.origin + window.location.pathname), getPlanMonths(store?.frecuency))
            console.log('repuesta del servidor: ',response)
            if(response?.redirectUrl){
                window.location.href = response?.redirectUrl
            }else{
                throw new Error('Failed comunication with Saferpay')
            }
        } catch (e) {
            console.error(e)
            setSubmitting(false)
            toast.error(<CustomToast type='error' title='Error' content={glosaryAuth.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        } finally {
            setSubmitting(false)

        }
    }
    const handleSubmit_2 = async (values: IValues2, { setSubmitting }: FormikHelpers<IValues2>) => {
        const formData = values
        console.log('formik values', formData)
        try {
            store?.setForm_1(formData)
            let affiliateStored = await showAffiliate({email:formData.email})
            let affiliateId
            console.log('there is a previous affiliate ', affiliateStored)
            if(!affiliateStored){
                return toast.error(<CustomToast type='error' title='Error' content={glosary.errorFindAffiliate} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
            }else{
                await updateAffiliate({
                    id:affiliateStored.id,
                    plan:getPlanEnum(planSelected?.id),
                })
                formRef_1.current?.setFieldValue('id', affiliateStored.id)
                affiliateId = affiliateStored.id
                store.setAffiliateId(affiliateStored.id)
            }
            console.log('making a saferpay bank request')
            const response = await paymentInitialization(planSelected?.title || 'Description', planSelected?.price || 100, affiliateId, (window.location.origin + window.location.pathname), getPlanMonths(store?.frecuency))
            console.log('repuesta del servidor: ',response)
            if(response?.redirectUrl){
                window.location.href = response?.redirectUrl
            }else{
                throw new Error('Failed comunication with Saferpay')
            }
        } catch (e) {
            console.error(e)
            setSubmitting(false)
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
        setPage(initialForm)
    }, [initialForm])
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
                    content: { backgroundColor: '#FFFFFF', padding: 0, borderRadius: 8, boxShadow: '0px 12px 30px 0px #1973FA14', width: width < 800 ? '100vw' : 1000 , position: 'relative', display: 'flex', flexDirection: width < 800 ? 'column-reverse' : 'row', gap: 0, color: '#000000DE', inset: 0, zIndex: 5,height: width < 800 ? '100vh' : undefined , }
                }}>
                    <div className={styles.wizardContainer}>
                        <div className={styles.stepContainer}>
                            {
                                steps.map(el => (
                                    <div key={el.index} className={styles.stepActive}>
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
                                            <Form className={styles.form} style={{justifyContent:'space-between', flexGrow:1}}>
                                                <div className={styles.form} style={{gap:16}}>
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
                                                </div>
                                                <div className={styles.form}>
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
                                                    <div className={styles.subtotalContainer}>
                                                        <span className={styles.subtotalText}>
                                                            {
                                                                glosary.feeLabel
                                                            }
                                                            {
                                                                ' (17.00%) TVA'
                                                            }
                                                        </span>
                                                        <span className={styles.subtotalText}>
                                                            {((planSelected?.price || 0) * FEE).toLocaleString('es-es',{minimumFractionDigits: 2, maximumFractionDigits:2})}
                                                            {' €'}
                                                        </span>
                                                    </div>

                                                    <div className={styles.totalContainer}>
                                                        <span className={styles.subtotalText}>
                                                                {
                                                                    glosary.priceTotalLabel
                                                                }
                                                            </span>
                                                            
                                                            <div className={styles.totalPriceContainer}>
                                                                <span className={styles.totalText} style={poppinsSemiBold.style}>
                                                                    {((planSelected?.price || 0) * FEE_MULTIPLY).toLocaleString('es-es',{minimumFractionDigits: 2, maximumFractionDigits:2})}
                                                                    {' €'}
                                                                </span>
                                                            </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                <div className={styles.innerForm}>
                                    {<Formik
                                        key={2}
                                        initialValues={initialValues_2}
                                        validationSchema={validationSchema_2}
                                        onSubmit={handleSubmit_2}
                                        innerRef={formRef_2}
                                        enableReinitialize

                                    >
                                        {({ isSubmitting, values, handleChange, errors, touched }) => (
                                            <Form className={styles.form} style={{flexGrow:1, justifyContent:'space-between'}}>
                                                <InputText label={glosary.inputLabel_3} placeholder={glosary.inputPlaceholder_3} error={errors.email} touched={touched.email} value={values.email} onChange={handleChange('email')}
                                                />
                                                <div className={styles.form}>
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
                                                    <div className={styles.subtotalContainer}>
                                                        <span className={styles.subtotalText}>
                                                            {
                                                                glosary.feeLabel
                                                            }
                                                            {
                                                                ' (17.00%) TVA'
                                                            }
                                                        </span>
                                                        <span className={styles.subtotalText}>
                                                            {((planSelected?.price || 0) * FEE).toLocaleString('es-es',{minimumFractionDigits: 2, maximumFractionDigits:2})}
                                                            {' €'}
                                                        </span>
                                                    </div>
                                                    <div className={styles.totalContainer}>
                                                        <span className={styles.subtotalText}>
                                                                {
                                                                    glosary.priceTotalLabel
                                                                }
                                                            </span>
                                                            <div className={styles.totalPriceContainer}>
                                                                <span className={styles.totalText} style={poppinsSemiBold.style}>
                                                                    {((planSelected?.price || 0) * FEE_MULTIPLY).toLocaleString('es-es',{minimumFractionDigits: 2, maximumFractionDigits:2})}
                                                                    {' €'}
                                                                </span>

                                                            </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>}
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
                                    <Button title={glosary.buttonAction_1} onClick={closeModal} Icon={FaChevronLeft} type='outline' />
                                    <Button title={glosary.buttonAction_2} grow={true} loading={formRef_2.current?.isSubmitting} onClick={onSubmit2} />
                                </>
                            }
                        </div>
                        <div className={styles.rowButtons}>
                            <p className={[globalStyles.text].join(' ')} style={{...poppinsRegular.style,fontSize:12, lineHeight:1.4}}>
                                <span>{glosary.terms1}</span><span style={poppinsSemiBold.style}>{glosary.buttonAction_2}</span><span>{glosary.terms2}</span><Link className={[globalStyles.textPrimary].join(' ')} style={poppinsSemiBold.style} href="/terms" target='_blank'>{glosary.terms3}</Link>
                            </p>
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
                        </div>
                        <ul className={styles.listContainer}>
                            {
                                planSelected?.list.map((el,index)=>(<li className={[styles.listItem].join(' ')} key={index}>
                                    <div className={styles.iconList}>
                                        <IconCheck/>
                                    </div>
                                    <span className={[globalStyles.text].join(' ')} style={{fontSize:12, lineHeight:1.4}}>
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
