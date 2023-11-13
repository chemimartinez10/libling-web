import React from 'react'
import styles from './article.module.css'
import { FiCheckCircle } from 'react-icons/fi'
import { poppinsSemiBold } from '../fonts'

interface IArticle {
    title?: string
    subtitle: string
    content?: string
    list?: string[]
    Icon?: React.ElementType
}

const Article: React.FC<IArticle> = ({ title, subtitle, content, list, Icon }) => {
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
                <h3 className={styles.subtitle} style={poppinsSemiBold.style}>{subtitle}</h3>
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
                                <FiCheckCircle style={{ fontSize: 20, alignSelf: 'center' }} />

                                </div>
                                <span>
                                    {el}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            }
        </article>
    )
}

export default Article