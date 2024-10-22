import React from 'react'
import styles from './affiliateCard.module.css'
import globalStyles from '@/app/globals.module.css'
import { Button } from './admin/button'
import { dict } from '../utils'
import { poppinsSemiBold } from '../fonts'
import IconCheck from './icons/iconCheck'

interface IAffiliateCard {
    id: number
    title: string
    content: string
    list: string[]
    frecuency: string
    type?:"outline" | "main" | "secondary" | "tonal" | "text" | "warning" | "error" | undefined
    lang: "es" | "en" | "fr"
    price: number
    onSelect: (id: number) => void
}

const AffiliateCard: React.FC<IAffiliateCard> = ({ id,title, content, list, price, frecuency, onSelect, type = 'outline', lang}) => {
    const glosary = dict[lang].services
    return (
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <h3 className={globalStyles.smallTitle} style={{...poppinsSemiBold.style, fontSize:20}}>{title}</h3>
                <p className={globalStyles.smallText}>{content}</p>
            </div>
            <div className={styles.priceContainer}>
                <span className={[globalStyles.regularTitle].join(' ')} style={{display:'flex', flexDirection:'row', alignItems:'center', gap:8}}>
                    {price.toLocaleString('es-es',{minimumFractionDigits: 2})}
                    {' € '}
                    <span className={globalStyles.smallText}>
                        {'+ TVA'}
                    </span>
                </span>
            </div>
            <div className={styles.bodyContainer}>
                <Button type={type} title={glosary.planActionButton} onClick={()=>{onSelect(id)}}/>
                <ul className={styles.listContainer}>
                    {
                        list.map((el,index)=>(<li className={[styles.listItem].join(' ')} key={index}>
                            <div className={styles.iconList}>
                                <IconCheck/>
                            </div>
                            <span className={[globalStyles.text].join(' ')} style={{fontSize:14, lineHeight:1.4}}>
                                {el}
                            </span>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}

export default AffiliateCard