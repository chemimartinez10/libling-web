import React from 'react'
import styles from './propertyList.module.css'
import globalStyles from '@/app/globals.module.css'
import { IPropertyData } from '@/app/interfaces/models'
import { poppinsMedium } from '@/app/fonts'
import { rentPaymentPeriods } from '@/app/utils/data'
import { dataTranslate, langType } from '@/app/interfaces'
import { dict } from '@/app/utils'
import { FiEdit2, FiEye, FiTrash } from 'react-icons/fi'
import placeholder from '@/app/img/100.jpeg'

import Image from 'next/image'

interface IListItem {
    item: IPropertyData
    lang: langType
    onSelect?: () => void
    onEdit?: () => void
    onPreview?: () => void
    onDelete?: () => void
}

const PropertyListItem: React.FC<IListItem> = ({ item, lang, onSelect, onPreview, onDelete, onEdit }) => {
    const glosaryData = dict[lang].data
    const glosaryAdmin = dict[lang].adminProperties
    const glosary = dict[lang].immo
    return (
        <tr>
            <td>
                <div className={globalStyles.checkboxControl}>
                    <input type="checkbox" id="cboxInput" name="select_all" onChange={onSelect} />
                </div>
            </td>
            <td>
                <div className={styles.basicContainer}>
                    <Image className={styles.basicMini} src={item.thumbnail || placeholder} alt={item.title} width={70} height={70} />
                    <div className={styles.basicTextContainer}>
                        <span>{item.title}</span>
                        <span className={styles.basicSubtitle}>{item.content}</span>
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.priceContainer}>
                    {
                        !!item.currency &&
                        <span className={styles.price} style={poppinsMedium.style}>{item.currency.symbol}{" "}</span>
                    }
                    {
                        !!item.price &&
                        <span className={styles.price} style={poppinsMedium.style}>{item.price.toLocaleString('en-US')}</span>
                    }
                    {
                        !!item.frecuency &&
                        <span className={styles.frecuency}>{` / ${item.frecuency ? rentPaymentPeriods.find(element => item.frecuency?.toString() === element.key.toString())?.value : undefined}`}</span>
                    }
                </div>
            </td>
            <td>
                {`${item.propertyType.name in glosaryData ? glosaryData[item.propertyType.name as dataTranslate] : item.propertyType.name} ${glosary.miniatureConector} ${item.type ? glosaryAdmin.formLabelSale.toLocaleLowerCase() : glosaryAdmin.formLabelRent.toLocaleLowerCase()}`}
            </td>
            <td>
                {
                    item.active
                        ?
                        <span className={styles.badgeActive}>
                            {glosaryAdmin.listActive}
                        </span>
                        :
                        <span className={styles.badge}>

                            {glosaryAdmin.listInactive}
                        </span>
                }
            </td>
            <td>
                <div className={styles.actionContainer}>
                    <FiEye className={styles.action} onClick={!!onPreview ? onPreview : () => { }} />
                    <FiEdit2 className={styles.action} onClick={!!onEdit ? onEdit : () => { }} />
                    <FiTrash className={styles.action} onClick={!!onDelete ? onDelete : () => { }} />
                </div>
            </td>
        </tr>
    )
}

export default PropertyListItem