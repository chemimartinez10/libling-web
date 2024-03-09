'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './propertyCategory.module.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IMetaPaginate, IPropertyData, IPropertyOrderBy, IPropertySearch } from '../interfaces/models'
import { indexProperty } from '@/services'
import PropertyCard from './propertyCard'
import { rentPaymentPeriods } from '../utils/data'
import { dict } from '../utils'
import { dataTranslate } from '../interfaces'

interface IPropertyCategory {
    title: string
    description: string
    filters?: IPropertySearch
    orderBy?: IPropertyOrderBy
    initialData?: IPropertyData[] | null
    metaData?: IMetaPaginate
    page?: number
    limit?: number
    lang: 'es' | 'en' | 'fr'
}

const PropertyCategory: React.FC<IPropertyCategory> = ({ title, description, filters, orderBy, page, limit, lang, initialData, metaData }) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [enableLeft, setEnableLeft] = useState(false)
    const [enableRight, setEnableRight] = useState(false)
    const [properties, setProperties] = useState<IPropertyData[] | null | undefined>(initialData)
    const [currentPage, setCurrentPage] = useState<number>(initialData ? page || 2 : 1)
    const [meta, setMeta] = useState<IMetaPaginate | undefined>(metaData)
    const glosary = dict[lang].immo
    const glosaryData = dict[lang].data
    const glosaryAdmin = dict[lang].adminProperties
    const fetchProperties = async () => {
        const data = await indexProperty(filters, orderBy, currentPage, limit)
        console.log('propertyData', data)
        const newArray = data?.data
        setMeta(data?.meta)
        setProperties(state => {
            if (!state) {
                return [...newArray]
            }
            else {
                return [...state, ...newArray]
            }
        })
        setCurrentPage(state => state + 1)
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
        if (e.currentTarget.scrollLeft > 0) {
            setEnableLeft(true)
        }
        else {

            setEnableLeft(false)
        }
        if (e.currentTarget.scrollWidth <= scrollRight) {
            //hacer scroll hasta el final
            if(meta?.nextPage){
                fetchProperties()
            }
            setEnableRight(false)
        }
        else {

            setEnableRight(true)
        }
    };
    useEffect(() => {
        if (properties === undefined) {
            fetchProperties()
        }
    }, [])
    useEffect(() => {
        if (sectionRef.current && sectionRef.current?.scrollWidth > sectionRef.current?.offsetWidth) {
            setEnableRight(true)
        } else {
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
                        properties?.map((el, index) => (
                            <PropertyCard key={index} id={el.id.toString()} location={el.country.name} currency={el.currency.symbol} price={el.price} frecuency={el.frecuency ? rentPaymentPeriods.find(element => el.frecuency?.toString() === element.key.toString())?.value : undefined} subtitle={`${el.propertyType.name in glosaryData ? glosaryData[el.propertyType.name as dataTranslate] : el.propertyType.name} ${glosary.miniatureConector} ${el.type ? glosaryAdmin.formLabelSale.toLocaleLowerCase() : glosaryAdmin.formLabelRent.toLocaleLowerCase()}`} area={`${el.area} m${"\u00B2"}`} bedrooms={el.bedrooms?.toString()} bathrooms={el.bathrooms?.toString()} thumbnail={el.thumbnail?.toString()} />
                        ))
                    }
                </div>
            </div>
        </article>
    )
}

export default PropertyCategory