import React from 'react'
import styles from './page.module.css'
import { dict } from '@/app/utils'
import { findPropertyType, indexProperty, showProperty } from '@/services'
import ImageGallery from '@/app/components/imageGallery'
import InnerNav from '@/app/components/innerNav'
import { poppinsMedium } from '@/app/fonts'
import { combustiblesCalefaccion, mecanismosCalefaccion, medidasAreaTerrenos, mediosCalefaccion, rentPaymentPeriods } from '@/app/utils/data'
import IconArea from '@/app/components/icons/iconArea'
import IconBed from '@/app/components/icons/iconBed'
import IconBath from '@/app/components/icons/iconBath'
import { Button } from '@/app/components/admin/button'
import { ISelectElement } from '@/app/interfaces'
import { getMapStyles } from '@/app/actions'
import CustomMap from '@/app/components/map'
import PropertyCard from '@/app/components/propertyCard'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { redirect } from 'next/navigation'
import Pagination from '@/app/components/pagination'

interface ISearch {
    params: {
        lang: "es" | "en" | "fr"
    },
    searchParams: { [key: string]: string | string[] | undefined }

}

const Search: React.FC<ISearch> = async ({ params: { lang }, searchParams }) => {
    console.log('Chemi aca esta', searchParams)
    const filters = {
        type: !!searchParams?.type && typeof searchParams?.type === 'string' && parseInt(searchParams?.type) ? true : false,
        propertyTypeId: !!searchParams?.propertyType && typeof searchParams?.propertyType === 'string' ? parseInt(searchParams?.propertyType) : undefined,
        address: !!searchParams?.address && typeof searchParams?.address === 'string' ? searchParams?.address : undefined,

    }
    const page = !!searchParams?.page && typeof searchParams?.page === 'string' && parseInt(searchParams?.page) ? parseInt(searchParams?.page) : undefined
    const glosaryData = dict[lang].data
    const propertyType = await findPropertyType(filters.propertyTypeId || 0)
    //@ts-ignore
    const propertyTypeName = propertyType && propertyType.name in glosaryData ? glosaryData[propertyType.name] : null
    const response = await indexProperty(filters, page)
    const properties = response.data
    const pagination = response.meta
    const glosary = dict[lang].immo
    const glosaryNav = dict[lang].navbar
    const glosaryAdmin = dict[lang].adminProperties
    const urlQuery = new URLSearchParams('')
    urlQuery.set('type', searchParams?.type?.toString() || '')
    urlQuery.set('propertyType', searchParams?.propertyType?.toString() || '')
    urlQuery.set('address', searchParams?.address?.toString() || '')

    
    return (<>
        <InnerNav text={glosary.backSearch} />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title} style={poppinsMedium.style}>{`${propertyTypeName || glosaryNav.admin_1} ${glosary.miniatureConector} ${filters.type ? glosaryAdmin.formLabelSale.toLowerCase() : glosaryAdmin.formLabelRent.toLowerCase()} ${filters.address ? glosary.altConector : ''} ${filters.address ? filters.address : ''}`}</h1>
                <span className={styles.subtitle}>{`${pagination.totalData} ${glosary.results} - ${glosary.page} ${pagination.page}`}</span>

            </div>
            <div className={styles.cardContainer}>
                {
                    properties.map((el, index) => (
                        //@ts-ignore
                        <PropertyCard key={index} id={el.id.toString()} location={el.country.name} currency={el.currency.symbol} price={el.price} frecuency={el.frecuency ? rentPaymentPeriods.find(element => el.frecuency?.toString() === element.key.toString())?.value : undefined} subtitle={`${el.propertyType.name in glosaryData ? glosaryData[el.propertyType.name] : el.propertyType.name} ${glosary.miniatureConector} ${el.type ? glosaryAdmin.formLabelSale.toLocaleLowerCase() : glosaryAdmin.formLabelRent.toLocaleLowerCase()}`} area={`${el.area} m${"\u00B2"}`} bedrooms={el.bedrooms?.toString()} bathrooms={el.bathrooms?.toString()} thumbnail={el.thumbnail?.toString()} />
                    ))
                }
            </div>
            <Pagination pagination={pagination} searchParams={urlQuery.toString()} url={'/immo/search'} />
        </div>
    </>
    )
}

export default Search