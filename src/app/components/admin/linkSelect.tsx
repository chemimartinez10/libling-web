'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './input.module.css'
import { ILinkSelect, ISelectElement, dataTranslate } from '@/app/interfaces'
import { dict } from '@/app/utils'
import { useRouter } from 'next/navigation'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

const LinkSelect: React.FC<ILinkSelect> = ({list, lang, title, disabled = false }) => {
    const [openList, setOpenList] = useState(false)
    const [currentStyle, setCurrentStyle] = useState(disabled ? styles.linkDisabled : styles.link)
    const [listFiltered, setListFiltered] = useState<ISelectElement[]>(list || [])
    const router = useRouter()

    const handleClick = () => {
        setOpenList(state => !state)
    }
    const handleBlur = () => {
        setTimeout(()=>{
            setOpenList(false)
        },200)
    }
    const handleChange = (e:ISelectElement)=>{
        if(e?.extra) return router.push(e?.extra)
    }
    useEffect(() => {
        if (!!list) {
            setListFiltered(list)
        }
    }, [list])
    return (
        <div className={styles.formControl}>
            <div className={styles.inputContainer} onClick={handleClick} >
                <span className={currentStyle} onBlur={handleBlur}>
                    {title}
                    {
                        openList ?
                        <FaChevronUp className={styles.closeIcon}/>
                        :
                        <FaChevronDown className={styles.closeIcon}/>
                    }
                </span>
                <div className={openList ? styles.listContainerLarge : styles.listContainerHidden}>
                    {
                        listFiltered.map((el, index) => (
                            <div key={index} className={styles.listItemButtonMini} onClick={() => { handleChange(el) }}>
                                {
                                    (!!lang && !!el.value && el.value in dict[lang].data && dict[lang].data[el.value as dataTranslate])
                                        ?
                                        dict[lang].data[el.value as dataTranslate]
                                        :
                                        el.value
                                }
                                {
                                    !!el.description ? <span className={styles.listItemButtonDescription}>
                                        {` ${el.description}`}
                                    </span> : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LinkSelect
