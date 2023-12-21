import React from 'react'
import styles from './cardHorizontal.module.css'
import Button from './button'
import Image, { StaticImageData } from 'next/image'
import { FiCheck } from 'react-icons/fi'
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

const CardHorizontal: React.FC<ICard> = ({ image, title, subtitle, content, list, actionText, actionUrl }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHead}>
                {
                    (title)
                    &&
                    <>
                        <div className={styles.subtitleContainer}>
                            <h3 style={poppinsMedium.style}>{title}</h3>
                        </div>

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

                    {
                        (actionText && actionUrl)
                        &&
                        <Button text={actionText} />
                    }
                </div>
                {
                    (subtitle)
                    &&
                    <>
                        <h3 style={poppinsBold.style} className={styles.subtitle}>{subtitle}</h3>

                    </>

                }

            </div>
        </div>
    )
}

export default CardHorizontal