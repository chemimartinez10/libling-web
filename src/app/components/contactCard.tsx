import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './contactCard.module.css'

interface IContactCard {
    description?: string
    Icon: React.ElementType
    color:string
    background?:string
}

const ContactCard: React.FC<IContactCard> = ({ description, Icon, color, background = '#225FE7' }) => {
    return (
        <div className={styles.container} style={{borderColor:color, backgroundColor:background}}>
            {Icon &&
                <Icon style={{ fontSize: 80, alignSelf: 'center', color:'#fff' }} />
            }
            {
                description &&
                <p className={styles.description}>{description}</p>
            }
        </div>
    )
}

export default ContactCard