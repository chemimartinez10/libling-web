import React, { useRef, useState } from 'react'
import styles from './propertyCategory.module.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface IPropertyCategory {
    title: string
    description: string
}

const PropertyCategory: React.FC<IPropertyCategory> = ({ title, description }) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [enableLeft, setEnableLeft] = useState(false)
    const [enableRight, setEnableRight] = useState(true)
    const handleLeftScroll = (reference: React.RefObject<HTMLDivElement>) => {
        if (reference.current?.offsetWidth) {
            reference.current?.scrollBy({ left: -reference.current.offsetWidth, behavior:'smooth' })
        }

    }
    const handleRightScroll = (reference: React.RefObject<HTMLDivElement>) => {
        if (reference.current?.offsetWidth) {
            reference.current?.scrollBy({ left: reference.current.offsetWidth, behavior:'smooth' })
        }

    }
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollRight = e.currentTarget.scrollLeft + e.currentTarget.offsetWidth
        console.log(e.currentTarget.offsetWidth, e.currentTarget.scrollLeft, scrollRight, e.currentTarget.scrollWidth)
        if (e.currentTarget.scrollLeft > 0) {
            setEnableLeft(true)
        }
        else {

            setEnableLeft(false)
        }
        if (e.currentTarget.scrollWidth <= scrollRight) {
            setEnableRight(false)
        }
        else {

            setEnableRight(true)
        }
    };
    return (
        <article className={styles.propertiesContainer}>
            <div className={styles.propertiesTextContainer}>
                <h2 className={styles.propertiesContainerTitle}>{title}</h2>
                <p className={styles.propertiesContainerDescription}>{description}</p>
            </div>
            <div className={styles.propertiesCarrouselContainer}>
                {
                    (enableLeft)
                    &&
                    <div className={styles.leftScroller} onClick={() => { handleLeftScroll(sectionRef) }}><FiChevronLeft /></div>
                }
                {
                    (enableRight)
                    &&
                    <div className={styles.rightScroller} onClick={() => { handleRightScroll(sectionRef) }}><FiChevronRight /></div>
                }
                <div className={styles.propertiesCarrousel} onScroll={handleScroll} ref={sectionRef}>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                    <div className={styles.propertiesCard}></div>
                </div>
            </div>
        </article>
    )
}

export default PropertyCategory