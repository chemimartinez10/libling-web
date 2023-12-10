import React from 'react'
import styles from './card.module.css'
import Button from './button'
import Image, { StaticImageData } from 'next/image'
import { FiCheck, FiCheckCircle } from 'react-icons/fi'
import { poppinsBold, poppinsMedium } from '../fonts'

interface ICard {
    image?: StaticImageData
    title?: string
    subtitle?: string
    content?: string
    list?: string[]
    actionText?: string
    actionUrl?: string
    big?: boolean
}

const Card: React.FC<ICard> = ({ image, title, subtitle, content, list, actionText, actionUrl, big = false }) => {
    return (
        <div className={big ? styles.cardBigContainer : styles.cardContainer}>
            <div className={big ? styles.cardBigHead : styles.cardHead}>
                {
                    (title)
                    &&
                    <>
                        <div className={styles.subtitleContainer}>
                            <h3 style={poppinsMedium.style}>{title}</h3>
                        </div>

                    </>

                }
                {
                    (subtitle)
                    &&
                    <>
                        <h3 style={poppinsBold.style}>{subtitle}</h3>

                    </>

                }
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardText}>
                    {
                        content &&
                        <p>{content}</p>
                    }
                    {
                        list &&
                        <ul className={styles.list}>
                            {list.map((el, index) => (<li key={index}>
                                <div style={{ width: 32, height: 32 }}>

                                    <FiCheck style={{ fontSize: 32, alignSelf: 'center', color: '#225FE7' }} />
                                </div>
                                <span>
                                    {el}
                                </span>
                            </li>))}

                        </ul>
                    }

                </div>

                {
                    (actionText && actionUrl)
                    &&
                    <Button text={actionText} />
                }
            </div>
        </div>
    )
}

export default Card