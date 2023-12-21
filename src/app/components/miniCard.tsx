import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './miniCard.module.css'

interface IMiniCard {
    title?: string
    description?: string
    img: StaticImageData
    alt: string
}

const MiniCard: React.FC<IMiniCard> = ({ title, description, img, alt }) => {
    return (
        <div className={styles.container}>


            <Image src={img} width={300} height={400} alt={alt} style={{objectFit:'cover', objectPosition:'center'}} />
            <div className={styles.infoContainer}>
                {
                    title &&
                    <h4 className={styles.title}>{title}</h4>
                }
                {
                    description &&
                    <p className={styles.description}>{description}</p>
                }
            </div>

        </div>
    )
}

export default MiniCard