'use client'
import Image, { StaticImageData } from 'next/image'
import styles from './animatedImage.module.css'
import React from 'react'

interface IAnimatedImage{
    image:StaticImageData
    alt:string
    reverse?:boolean
}

const AnimatedImage:React.FC<IAnimatedImage> = ({image, alt, reverse = false}) => {
  return (
    <div className={styles.container}>
        <Image className={reverse ? styles.squareReversed : styles.square} src={image} alt={alt} width={490} height={366} priority={true} sizes="(max-width: 1440px) 100vw, 1440px" style={{ objectFit: 'cover', objectPosition: 'center center', top:0, left:reverse ? undefined :0, right:reverse ? 0 : undefined, zIndex:2 }} quality={100}/>
        <div className={reverse ? styles.squareReversed : styles.square} style={{backgroundColor:'#FFFFFF', top:8, left:reverse ? undefined : 8, right:reverse ? 8 : undefined, zIndex:1}}></div>
        <div className={reverse ? styles.squareReversed : styles.square} style={{backgroundColor:'#23A6FF', top:16, left:reverse ? undefined : 16, right:reverse ? 16 : undefined, zIndex:0}}></div>
    </div>
  )
}

export default AnimatedImage