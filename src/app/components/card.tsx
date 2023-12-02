import React from 'react'
import styles from './card.module.css'
import Button from './button'
import Image, { StaticImageData } from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import { poppinsBold, poppinsMedium } from '../fonts'

interface ICard {
    image?: StaticImageData
    title?: string
    subtitle: string
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
                    image &&
                    <div className={styles.cardImage}>
                        <Image src={image} width={big ? 350 : 300} height={big ? 175 : 150} alt='planImg' style={{objectFit:"cover", objectPosition:"center center"}} />

                    </div>
                }
                {
                    (title && subtitle)
                    &&
                    <>
                    <div className={styles.subtitleContainer}>
                        <h3 style={poppinsMedium.style}>{title}</h3>
                        <h3 style={poppinsBold.style}>{subtitle}</h3>
                    </div>
                    <div className={styles.underline}></div>
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
                        <ul>
                            {list.map((el, index) => (<li key={index}>
                                <div style={{ width: 20, height: 20, paddingTop: 2 }}>
                                    <FiCheckCircle style={{ fontSize: 20, alignSelf: 'center' }} />

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