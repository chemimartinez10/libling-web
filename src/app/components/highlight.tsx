import Image from 'next/image'
import React from 'react'
import styles from './highlight.module.css'

interface IHighlight {
    title?: string
    description?: string
    img?: string
    alt: string
    Icon?: React.ElementType
}

const Highlight: React.FC<IHighlight> = ({ title, description, img, Icon, alt }) => {
    return (
        <div className={styles.container}>
            {
                title &&
                <h4 className={styles.title}>{title}</h4>
            }
            {
                Icon
                &&
                <div className={styles.circleContainer}>
                    <Icon style={{ fontSize: 48 }} />

                </div>
            }
            {
                img
                &&
                <div className={styles.circleContainer}>
                    <Image src={img} width={100} height={100} alt={alt} />

                </div>
            }
            {
                description &&
                <p>{description}</p>
            }
        </div>
    )
}

export default Highlight