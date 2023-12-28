'use client'

import Image, { StaticImageData } from 'next/image'
import React, { BaseSyntheticEvent, SyntheticEvent, useState } from 'react'
import styles from './highlight.module.css'
import { FaTimes } from 'react-icons/fa'
import { poppinsBold } from '../fonts'

interface IHighlight {
    title?: string
    description?: string
    img?: StaticImageData
    alt: string
    Icon?: React.ElementType
}

const Highlight: React.FC<IHighlight> = ({ title, description, img, Icon, alt }) => {
    const [open, setOpen] = useState(false)
    const handleClose = (event: BaseSyntheticEvent) => {
        console.log(event)
        if (event?.target?.id === 'dialogBackdrop') {
            setOpen(false)
        }
    }
    return (<>
        {
            open &&
            <div id='dialogBackdrop' className={styles.dialog} onClick={handleClose}>
                <article id='dialogCard' className={styles.dialogContainer}>
                    <div className={styles.dialogClose} onClick={()=>{setOpen(false)}}>
                        <FaTimes/>
                    </div>
                    <h2 style={{...poppinsBold.style}} className={styles.modalTitle}>{title}</h2>
                    <p>{description}</p>
                </article>
            </div>
        }
        <div className={styles.container} onClick={() => { setOpen(state => !state) }}>
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
                    <Image src={img} width={80} height={80} alt={alt} />

                </div>
            }
            {
                description &&
                <p>{description}</p>
            }
        </div>
    </>
    )
}

export default Highlight