import React from 'react'
import styles from './consultCard.module.css'
import globalStyles from '@/app/globals.module.css'
import IconBigCheck from './icons/iconBigCheck'
interface IConsultCard{
    title:string
    content:string
    align?:string
    border?:boolean
}

const ConsultCard:React.FC<IConsultCard> = ({title,content,align='center',border}) => {
  return (
    <div className={border ? styles.borderContainer : styles.container} style={{justifySelf:align}}>
        <IconBigCheck/>
        <h4 className={globalStyles.tinyTitle}>{title}</h4>
        <p className={globalStyles.smallText}>{content}</p>
    </div>
  )
}

export default ConsultCard