'use client'
import React, { useEffect, useRef, useState } from 'react'
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
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { Button } from '@/app/components/admin/button'
import InputSelect from '@/app/components/admin/inputSelect';
import { InputText } from '@/app/components/admin/inputText';
import useStore from '@/app/hooks/useStore';
import { usePropertyStore } from '@/app/hooks/usePropertyStore';
import { rentPaymentPeriods } from '@/app/utils/data';

interface IStepFive extends IPage {
    onNext: VoidFunction
    onBack: VoidFunction
}



const Preview: React.FC<IStepFive> = ({ params: { lang }, onNext, onBack }) => {
    const store = useStore(usePropertyStore, (state) => state)
    const glosary = dict[lang]?.adminProperties
    const [list, setList] = useState<ISelectElement[]>([])
    const [currency, setCurrency] = useState<ISelectElement[]>([])
    const [propertyTypes, setPropertyTypes] = useState<ISelectElement[]>([])
    const [countries, setCountries] = useState<ISelectElement[]>([])


    const [periods, setPeriods] = useState<ISelectElement[]>(rentPaymentPeriods)

    const fetchCurrency = async () => {
        const data = await getCurrencies()
        const newArray = data?.map(el => ({ key: el.id, value: el.symbol, description: el.name }))
        setCurrency(newArray || [])
    }
    const fetchPropertyTypes = async () => {
        const data = await getPropertyTypes()
        const newArray = data?.map(el => ({ key: el.id, value: el.name }))
        setPropertyTypes(newArray || [])
    }
    const fetchCountries = async () => {
        const data = await getCountries()
        const newArray = data?.map(el => ({ key: el.id, value: el.name }))
        setCountries(newArray || [])
    }

    useEffect(() => {
        fetchCurrency()
        fetchPropertyTypes()
        fetchCountries()
    }, [])
    return (<div className={styles.previewContainer}>
        <h1 className={styles.titlePreview} style={poppinsMedium.style}>{glosary.formPreviewTitle}</h1>
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <div className={styles.cardSection}>
                    <div className={styles.sectionRow}>
                        <h2 style={poppinsMedium.style} className={styles.sectionTitle}>{glosary.previewSectionTitle_1}</h2>
                        <span style={poppinsMedium.style} className={styles.sectionLink}>{glosary.formLinkEdit}</span>
                    </div>
                    <div className={styles.sectionContent}>
                        <div className={styles.sectionBlock}>
                            <span style={poppinsMedium.style} className={styles.sectionSubtitle}>{glosary.formLabelPropertyType}</span>
                            <span className={styles.sectionDescription}>{store?.form_1?.propertyType} {" > "} {}</span>
                        </div>
                        <div className={styles.sectionBlock}>
                            <span style={poppinsMedium.style} className={styles.sectionSubtitle}></span>
                            <span className={styles.sectionDescription}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.cardSection}>
                </div>
                <div className={styles.cardSection}>
                </div>
                <div className={styles.cardSection}>
                </div>
                <div className={styles.cardSectionEnd}>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Preview