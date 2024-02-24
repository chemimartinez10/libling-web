'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { dict } from '@/app/utils'
import { IPage } from '../../layout'
import { poppinsMedium } from '@/app/fonts'
import { useRouter } from 'next/navigation'
import InputSelect from '@/app/components/admin/inputSelect'
import InputTextSelect from '@/app/components/admin/inputTextSelect'
import { ISelectElement } from '@/app/interfaces'
import { createPropertyType, getPropertyTypes } from '@/services'
import { InputRadio } from '@/app/components/admin/inputRadio'
import InputSwitch from '@/app/components/admin/inputSwitch'
import { InputTextArea } from '@/app/components/admin/inputTextArea'
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const PropertyCreate: React.FC<IPage> = ({ params: { lang } }) => {
    const glosary = dict[lang]?.adminProperties
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [list, setList] = useState<ISelectElement[]>([])
    const finalStep = 5
    const arraySteps = new Array(finalStep).fill(0)
    const router = useRouter()
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
    const fetchPropertyTypes = async () => {
        const data = await getPropertyTypes()
        const newArray = data?.map(el => ({ key: el.id, value: el.name }))
        setList(newArray || [])
    }
    const goToCreate = () => {
        router.push('/admin/properties/create')
    }

    useEffect(() => {
        fetchPropertyTypes()
    }, [])
    return (<>
        <div className={styles.titleBar}>
            <div className={styles.stepContainer}>
                <span className={styles.stepText}>{glosary.formStep}{" "}{currentStep}{" "}{glosary.formStepConnector}{" "}{finalStep}</span>
                <div className={styles.indicatorContainer}>
                    {
                        arraySteps.map((el, index) => (
                            <div key={index} className={index <= currentStep - 1 ? styles.indicatorFill : styles.indicator}></div>
                        ))
                    }
                </div>
            </div>
            <span className={styles.buttonLink} onClick={() => { router.replace('/admin/properties') }}>
                {glosary.formOptionCancel}
            </span>
        </div>
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_1}</h2>
                <article className={styles.cardContent}>
                    <InputTextArea label={glosary.formLabelAddress} placeholder={glosary.formPlaceholderText} />
                    <InputSwitch list={listSwitch} initialValue={1} onChange={handleSellType} />
                    <InputRadio label={glosary.formLabelFurnished} option_1={glosary.formOptionYes} option_2={glosary.formOptionNo} />
                    <InputSelect label={glosary.formLabelHeatingMedium} placeholder={glosary.formPlaceholderSelect} list={list} onChange={handlePropertyType} />
                    <InputTextSelect label={glosary.formLabelPropertyType} placeholder={glosary.formPlaceholderSelectText} list={list} lang={lang} onChange={handlePropertyType} onAdd={handleAddPropertyType} />
                    <Map
                        initialViewState={{
                            longitude: 16.62662018,
                            latitude: 49.2125578,
                            zoom: 14
                        }}
                        style={{ width: 600, height: 400 }}
                        mapStyle="https://libling.lu/en/mapStyles.json"
                    />
                </article>
            </div>

        </section>
    </>
    )
}

export default PropertyCreate