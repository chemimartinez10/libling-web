import React from 'react'
import styles from './article.module.css'
import { FiCheckCircle } from 'react-icons/fi'

interface IArticle {
    title?: string
    subtitle: string
    content: string
    list?: string[]
    Icon?: React.ElementType
}

const Article: React.FC<IArticle> = ({ title, subtitle, content, list, Icon }) => {
    return (
        <article className={styles.container}>
            {Icon &&
                <Icon/>
            }
            {title &&
                <h5 className={styles.title}>{title}</h5>
            }
            {
                subtitle &&
                <h3 className={styles.subtitle}>{subtitle}</h3>
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
                                <FiCheckCircle />
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