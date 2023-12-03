import Image, { StaticImageData } from 'next/image'
import React from 'react'
import styles from './review.module.css'
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { poppinsBold } from '../fonts';

interface IReview {
    description?: string
    img: StaticImageData
    score?: number,
    title: string
}

const Review: React.FC<IReview> = ({ description, img, title }) => {
    return (
        <div className={styles.container}>
            {img &&
                <div className={styles.circleReview}>
                    <Image src={img} alt='review' width={250} height={250} style={{ fontSize: 24, alignSelf: 'center' }} />
                </div>
            }
            {
                title &&
                <p className={styles.title} style={poppinsBold.style}>{title}</p>
            }
            <div className={styles.listStars}>
                <RiStarFill style={{ color: "#225FE7" }} />
                <RiStarFill style={{ color: "#225FE7" }} />
                <RiStarFill style={{ color: "#225FE7" }} />
                <RiStarFill style={{ color: "#225FE7" }} />
                <RiStarFill style={{color:"#eee"}}/>
            </div>
            {
                description &&
                <p className={styles.description}>{description}</p>
            }
        </div>
    )
}

export default Review