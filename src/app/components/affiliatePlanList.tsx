'use client'
import React, { useState } from 'react'
import styles from './affiliatePlanList.module.css'
import { dict } from '../utils'
import AffiliateCard from './affiliateCard'
import InputSwitch from './admin/inputSwitch'

interface IAffiliatePlanList{
    lang: "es" | "en" | "fr"
}


const AffiliatePlanList:React.FC<IAffiliatePlanList> = ({lang}) => {
    const glosary = dict[lang]?.services
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
                    id:1,
                    title:glosary.planTitle1,
                    content:glosary.planContent1,
                    list:glosary.planList1,
                    price:47.08,
                },
                {
                    id:2,
                    title:glosary.planTitle2,
                    content:glosary.planContent2,
                    list:glosary.planList2,
                    price:126.25,
                },
                {
                    id:3,
                    title:glosary.planTitle3,
                    content:glosary.planContent3,
                    list:glosary.planList3,
                    price:73.7,
                },
            ]   
        },
        {
            id:3,
            name:glosary.sectionOption3,
            priceFrecuency:glosary.sectionOptionBy3,
            plans:[
                {
                    id:1,
                    title:glosary.planTitle1,
                    content:glosary.planContent1,
                    list:glosary.planList1,
                    price:85.6,
                },
                {
                    id:2,
                    title:glosary.planTitle2,
                    content:glosary.planContent2,
                    list:glosary.planList2,
                    price:229.5,
                },
                {
                    id:3,
                    title:glosary.planTitle3,
                    content:glosary.planContent3,
                    list:glosary.planList3,
                    price:134.0,
                },
            ]   
        },
    ]
    const listFrecuency = [
        {
            key: 1,
            value: glosary.sectionOption1,
            priceFrecuency:glosary.sectionOptionBy1,

        },
        {
            key: 2,
            value: glosary.sectionOption2,
            priceFrecuency:glosary.sectionOptionBy2,

        },
        {
            key: 3,
            value: glosary.sectionOption3,
            priceFrecuency:glosary.sectionOptionBy3,
        },
    ]
    
    //states
    const [frecuency, setFrecuency] = useState<string | number>(1)
    const [frecuencyName, setFrecuencyName] = useState<string>(glosary.sectionOptionBy1)

    //functions
    const handleFrecuency = (key: string | number) => {
        console.log('selected key', key)
        setFrecuency(key)
        setFrecuencyName(listFrecuency?.find(el=>el.key === key)?.priceFrecuency || glosary.sectionOptionBy1)
    }
    const handleSelectedPlan = (key:number) =>{
        console.log('the selected key was', key)
    }

    return (
        <div className={styles.container}>
            <InputSwitch list={listFrecuency} initialValue={1} onChange={handleFrecuency} />
            <div className={styles.cardContainer}>
            {
                affiliateList.find(el=>el.id === frecuency)?.plans?.map((el)=>(<AffiliateCard key={el.id} id={el.id} frecuency={frecuencyName} onSelect={handleSelectedPlan} title={el.title} content={el.content} list={el.list} price={el.price} type={el.id === 2 ? 'main' : 'outline'} lang={lang}/>))
            }
            </div>
        </div>
    )
}

export default AffiliatePlanList