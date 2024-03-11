'use client'
import { IPropertyList } from '@/app/interfaces'
import React, { useEffect, useState } from 'react'
import styles from './propertyList.module.css'
import globalStyles from '@/app/globals.module.css'
import { dict } from '@/app/utils'
import { poppinsMedium } from '@/app/fonts'
import { InputSearch } from './inputSearch'
import { Button } from './button'
import PropertyListItem from './propertyListItem'
import InputSelect from './inputSelect'
import useStore from '@/app/hooks/useStore'
import { useInterfaceStore } from '@/app/hooks/useInterfaceStore'
import InputSelectMini from './inputSelecMini'
import { indexProperty } from '@/services'
import { IMetaPaginate } from '@/app/interfaces/models'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

const PropertyList: React.FC<IPropertyList> = ({ lang, initialData, metaData }) => {
    const glosary = dict[lang].adminProperties
    const glosaryImmo = dict[lang].immo
    const store = useStore(useInterfaceStore, (state) => state)
    const [properties, setProperties] = useState(initialData)
    const [meta, setMeta] = useState<IMetaPaginate | undefined>(metaData)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [tab, setTab] = useState(0)
    const handlePrevPage = (jump: number) => {
        const canGoBack = currentPage - jump > 0
        if (canGoBack) {
            setCurrentPage(state => state - jump)
        }
    }
    const handleNextPage = (jump: number) => {
        const canGoNext = currentPage + jump <= (meta?.totalPages || 1)
        if (canGoNext) {
            setCurrentPage(state => state + jump)
        }
    }
    const fetchProperties = async () => {
        console.log('executing fetch')
        const data = await indexProperty({}, {}, currentPage, store?.limit, false)
        console.log('propertyData', data)
        setMeta(data?.meta)
        setProperties(data?.data)
    }

    const paginationList = [
        {
            key: 15,
            value: 15
        },
        {
            key: 20,
            value: 20
        },
        {
            key: 25,
            value: 25
        },
        {
            key: 30,
            value: 30
        },
        {
            key: 40,
            value: 40
        },
        {
            key: 50,
            value: 50
        },
    ]
    const handleCheck = () => { }
    const handleLimit = (key: string) => {
        console.log('selected key', key)
        store?.setLimit(parseInt(key))
    }
    const tabList = [
        {
            tab: 0,
            name: glosary.tabAll
        },
        {
            tab: 1,
            name: glosary.formLabelSale
        },
        {
            tab: 2,
            name: glosary.formLabelRent
        },
    ]
    useEffect(() => {
        setProperties(initialData)
    }, [initialData])

    useEffect(() => {
        if (store?.limit) {
            fetchProperties()

        }
    }, [store?.limit, currentPage])
    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.indexTitle}</h2>
                    <div className={styles.listTools}>
                        <InputSearch placeholder={glosaryImmo.headerButton} />
                        <Button title={glosary.formButtonRegister} goTo={'/admin/properties/create'} type='main' />
                    </div>
                </div>
                <div className={styles.tabContainer}>
                    {
                        tabList.map((el, index) => (<div key={index} className={tab === el.tab ? styles.selectedTab : styles.tab} style={poppinsMedium.style} onClick={() => { setTab(el.tab) }}>{el.name}</div>))
                    }
                </div>
            </div>
            <article className={styles.cardContent}>
                <table className={styles.tableContainer}>
                    <thead >
                        <th>
                            <div className={globalStyles.checkboxControl}>
                                <input type="checkbox" id="cboxInput" name="select_all" onChange={handleCheck} />
                            </div>
                        </th>
                        <th>{glosary.listBasic}</th>
                        <th>{glosary.formLabelPrice}</th>
                        <th>{glosary.formLabelPropertyType}</th>
                        <th>{glosary.listStatus}</th>
                        <th>{glosary.listActions}</th>
                    </thead>
                    <tbody>
                        {
                            properties?.map((el, index) => (

                                <PropertyListItem key={index} item={el} lang={lang} />
                            ))
                        }
                    </tbody>
                </table>
                <div className={styles.paginatorContainer}>
                    <span>{glosary.linesPerPage}</span>
                    <InputSelectMini initialValue={store?.limit} list={paginationList} placeholder='15' onChange={handleLimit} />
                    <span>
                        {((meta?.dataPerPage || 15) * (currentPage - 1)) + 1}
                        {" - "}
                        {((meta?.dataPerPage || 15) * (currentPage - 1)) + (properties?.length || 0)}
                        {` ${glosary.formStepConnector} `}
                        {meta?.totalData}
                    </span>
                    <div className={styles.pageControlContainer}>
                        <FiChevronsLeft  onClick={() => { handlePrevPage(5) }} />
                        <FiChevronLeft className={styles.pageControl} onClick={() => { handlePrevPage(1) }} />
                        <FiChevronRight className={styles.pageControl} onClick={() => { handleNextPage(1) }} />
                        <FiChevronsRight  onClick={() => { handleNextPage(5) }} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default PropertyList