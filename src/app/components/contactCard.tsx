import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './contactCard.module.css'

interface IContactCard {
    description?: string
    Icon: React.ElementType
    color:string
}

const ContactCard: React.FC<IContactCard> = ({ description, Icon, color }) => {
    return (
        <div className={styles.container} style={{borderColor:color}}>
            {Icon &&
                <Icon style={{ fontSize: 24, alignSelf: 'center' }} />
            }
            {
                description &&
                <p className={styles.description}>{description}</p>
            }
        </div>
    )
}

export default ContactCard