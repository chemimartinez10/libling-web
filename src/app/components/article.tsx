import React from 'react'
import styles from './article.module.css'
import { FaCircle } from "react-icons/fa6";
import { poppinsBold, poppinsSemiBold } from '../fonts'
import Button from './button'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';

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
                <h5 className={styles.title} >{title}</h5>
            }
            {
                subtitle &&
                <h3 className={bigSubtitle ? styles.bigSubtitle : styles.subtitle} style={poppinsBold.style}>{subtitle}</h3>
            }
            {
                content &&
                <p className={styles.content}>{content}</p>
            }
            {
                list &&
                <ul className={styles.list}>
                    {
                        list.map((el, index) => (
                            <li key={index}>
                                <div style={{ width: 20, height: 20, paddingTop:2 }}>
                                    <FaCircle style={{ fontSize: 10, alignSelf: 'center', color:'#225FE7' }} />
                                </div>
                                <span>
                                    {el}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            }
            {
                (!!image) &&
                <Image src={image} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} className={styles.image} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 300px, 400px' layout="responsive" />
            }
            {
                buttonText &&
                <Link href={buttonAction}>
                    <Button text={buttonText}/>
                </Link>
            }
        </article>
    )
}

export default Article