import React, { useEffect, useRef, useState } from 'react'
import styles from './propertyCategory.module.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IProperty, IPropertyData, IPropertySearch } from '../interfaces/models'
import { indexProperty } from '@/services'
import PropertyCard from './propertyCard'
import { rentPaymentPeriods } from '../utils/data'
import { dict } from '../utils'

interface IPropertyCategory {
    title: string
    description: string
    filters?: IPropertySearch
    page?: number
    limit?: number
    lang: 'es' | 'en' | 'fr'
}

const PropertyCategory: React.FC<IPropertyCategory> = ({ title, description, filters, page, limit, lang }) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [enableLeft, setEnableLeft] = useState(false)
    const [enableRight, setEnableRight] = useState(false)
    const [properties, setProperties] = useState<IPropertyData[] | null>(null)
    const glosary = dict[lang].immo
    const glosaryData = dict[lang].data
    const glosaryAdmin = dict[lang].adminProperties
    const fetchProperties = async () => {
        const data = await indexProperty(filters, page, limit)
        console.log('propertyData', data)
        const newArray = data?.data
        setProperties(newArray || [])
    }
    const handleLeftScroll = (reference: React.RefObject<HTMLDivElement>) => {
        if (reference.current?.offsetWidth) {
            reference.current?.scrollBy({ left: -reference.current.offsetWidth, behavior: 'smooth' })
        }

    }
    const handleRightScroll = (reference: React.RefObject<HTMLDivElement>) => {
        if (reference.current?.offsetWidth) {
            reference.current?.scrollBy({ left: reference.current.offsetWidth, behavior: 'smooth' })
        }

    }
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollRight = e.currentTarget.scrollLeft + e.currentTarget.offsetWidth
        console.log(e.currentTarget.offsetWidth, e.currentTarget.scrollLeft, scrollRight, e.currentTarget.scrollWidth)
        if (e.currentTarget.scrollLeft > 0) {
            setEnableLeft(true)
        }
        else {

            setEnableLeft(false)
        }
        if (e.currentTarget.scrollWidth <= scrollRight) {
            setEnableRight(false)
        }
        else {

            setEnableRight(true)
        }
    };
    useEffect(() => {
        fetchProperties()
    }, [filters, page, limit])
    useEffect(() => {
        if(sectionRef.current && sectionRef.current?.scrollWidth > sectionRef.current?.offsetWidth){
            setEnableRight(true)
        }else{
            setEnableRight(false)
        }
    }, [properties])
    return (
        <article className={styles.propertiesContainer}>
            <div className={styles.propertiesTextContainer}>
                <h2 className={styles.propertiesContainerTitle}>{title}</h2>
                <p className={styles.propertiesContainerDescription}>{description}</p>
            </div>
            <div className={styles.propertiesCarrouselContainer}>
                {
                    (enableLeft)
                    &&
                    <div className={styles.leftScroller} onClick={() => { handleLeftScroll(sectionRef) }}><FiChevronLeft /></div>
                }
                {
                    (enableRight)
                    &&
                    <div className={styles.rightScroller} onClick={() => { handleRightScroll(sectionRef) }}><FiChevronRight /></div>
                }
                <div className={styles.propertiesCarrousel} onScroll={handleScroll} ref={sectionRef}>
                    {
                        properties?.map((el,index)=>(
                            //@ts-ignore
                            <PropertyCard key={index} id={el.id} location={el.country.name} currency={el.currency.symbol} price={el.price} frecuency={el.frecuency ? rentPaymentPeriods.find(element=>el.frecuency?.toString() === element.key.toString())?.value : undefined} subtitle={`${el.propertyType.name in glosaryData ? glosaryData[el.propertyType.name] : el.propertyType.name} ${glosary.miniatureConector} ${el.type ? glosaryAdmin.formLabelSale.toLocaleLowerCase() : glosaryAdmin.formLabelRent.toLocaleLowerCase()}`} area={`${el.area} m${"\u00B2"}`} bedrooms={el.bedrooms} bathrooms={el.bathrooms} thumbnail={el.thumbnail}/>
                        ))
                    }
                </div>
            </div>
        </article>
    )
}

export default PropertyCategory