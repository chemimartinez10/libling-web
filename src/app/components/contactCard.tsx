import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './contactCard.module.css'

interface IContactCard {
    description?: string
    Icon: React.ElementType
    color:string
    background?:string
    url:string
}

const ContactCard: React.FC<IContactCard> = ({ description, Icon, color, background = '#225FE7', url }) => {
    return (
        <a className={styles.container} style={{borderColor:color, backgroundColor:background}} href={url}>
            {Icon &&
                <Icon style={{ fontSize: 48, alignSelf: 'center', color:'#fff' }} />
            }
            {
                description &&
                <p className={styles.description}>{description}</p>
            }
        </a>
    )
}

export default ContactCard