import React from 'react'
import styles from './article.module.css'
import globalStyles from '@/app/globals.module.css'
import { FaCircle } from "react-icons/fa6";
import { poppinsBold, poppinsSemiBold } from '../fonts'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';
import { Button } from './admin/button';

interface IArticle {
    title?: string
    subtitle: string
    buttonText?: string
    buttonAction?: string
    content?: string
    bigSubtitle?: boolean
    list?: string[]
    Icon?: React.ElementType
    image?:StaticImageData
}

const Article: React.FC<IArticle> = ({ title, subtitle, content, list, Icon, buttonText, buttonAction='#', bigSubtitle=false, image }) => {
    return (
        <article className={styles.container}>
            {Icon &&
                <Icon style={{fontSize:64, alignSelf:'center'}}/>
            }
            {title &&
                <h3 className={[globalStyles.miniTitle, globalStyles.textPrimary].join(' ')} style={poppinsSemiBold.style}>{title}</h3>
            }
            {
                subtitle &&
                <h5 className={[globalStyles.regularTitle].join(' ')}>{subtitle}</h5>
            }
            {
                content &&
                <p className={[globalStyles.commonText].join(' ')}>{content}</p>
            }
            {
                list &&
                <ul className={styles.list}>
                    {
                        list.map((el, index) => (
                            <li key={index}>
                                <div style={{ width: 16, height: 16, display:'flex', justifyContent:'center', alignContent:'center' }}>
                                    <FaCircle style={{ fontSize: 8, alignSelf: 'center', color:'#00000099' }} />
                                </div>
                                <span className={globalStyles.text} style={{flexShrink:1, flexWrap:'wrap'}}>
                                    {el}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            }
            {
                (!!image) &&
                <Image src={image} id='travel-img' width={600} height={600} style={{ borderRadius: 24, aspectRatio: '1', padding: 10, objectFit: 'cover', objectPosition:'center left' }} className={styles.image} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 300px, 400px' layout="responsive" />
            }
            {
                buttonText &&
                <Link href={buttonAction} style={{alignSelf:'flex-start'}}>
                    <Button title={buttonText}/>
                </Link>
            }
        </article>
    )
}

export default Article