import React from 'react'
import styles from './serviceCard.module.css'
import globalStyles from '@/app/globals.module.css'
import IconBigCheck from './icons/iconBigCheck'
interface IServiceCard{
    title:string
}

const ServiceCard:React.FC<IServiceCard> = ({title}) => {
  return (
    <div className={styles.container}>
        <IconBigCheck/>
        <h4 className={globalStyles.tinyTitle}>{title}</h4>
    </div>
  )
}

export default ServiceCard