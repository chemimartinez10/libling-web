'use client'
import React from 'react'
import styles from './article.module.css'
import globalStyles from '@/app/globals.module.css'
import { FaCircle } from "react-icons/fa6";
import { poppinsBold, poppinsSemiBold } from '../fonts'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';
import { Button } from './admin/button';
import AnimatedImage from './animatedImage';

export interface IArticleContent{
    value:string,
    bold?:boolean
}
interface IArticle {
    title?: string
    subtitle: string
    buttonText?: string
    buttonAction?: string
    content?: IArticleContent[]
    bigSubtitle?: boolean
    center?: boolean
    list?: string[]
    Icon?: React.ElementType
    image?:StaticImageData
    alt?:string
}

const Article: React.FC<IArticle> = ({ title, subtitle, content, list, Icon, buttonText, buttonAction='#', bigSubtitle=false, image, center = false, alt='travel' }) => {
    return (
        <article className={center ? styles.containerCenter : styles.container}>
            {Icon &&
                <Icon style={{fontSize:64, alignSelf:'center'}}/>
            }
            {title &&
                <div className={styles.mobileContainer}>
                    <h3 className={[globalStyles.miniTitle, globalStyles.textPrimary, center ? globalStyles.textCenter : ''].join(' ')} style={poppinsSemiBold.style}>{title}</h3>

                </div>
            }
            {
                subtitle &&
                <div className={styles.mobileContainer}>
                    <h5 className={[globalStyles.regularTitle, center ? globalStyles.textCenter : ''].join(' ')}>{subtitle}</h5>
                </div>

            }
            {
                (!!image) &&
                <div className={styles.imageContainer}>
                    <AnimatedImage
                    alt={alt}
                    image={image}
                    />
                </div>
            }
            {
                content &&
                <div className={styles.mobileContainer}>
                    <p className={[globalStyles.commonText, center ? globalStyles.textCenter : ''].join(' ')}>{
                        content.map((el, index)=>(<span key={index} style={el.bold ? poppinsBold.style : undefined}>
                            {el.value}
                        </span>))
                    }</p>
                </div>

            }
            {
                list &&
                <div className={styles.mobileContainer}>
                    <ul className={styles.list}>
                        {
                            list.map((el, index) => (
                                <li key={index}>
                                    <div style={{ width: 16, height: 16, display:'flex', justifyContent:'center', alignContent:'center', minWidth:16, minHeight:16 }}>
                                        <FaCircle style={{ fontSize: 8, alignSelf: 'center', color:'#00000099' }} />
                                    </div>
                                    <span className={globalStyles.text} style={{flexShrink:1, flexWrap:'wrap'}}>
                                        {el}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            }
            
            {
                buttonText &&
                <Link href={buttonAction} className={styles.linkButton} style={{alignSelf:center ? 'center' : 'stretch'}}>
                    <Button title={buttonText}/>
                </Link>
            }
        </article>
    )
}

export default Article