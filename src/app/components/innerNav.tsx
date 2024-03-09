'use client'
import React from 'react'
import { poppinsMedium } from '../fonts'
import { FiChevronLeft } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import styles from './innerNav.module.css'

interface IInnerNav {
    text: string
}

const InnerNav: React.FC<IInnerNav> = ({ text }) => {
    const router = useRouter()
    return (
        <div className={styles.navigationBar}>
            <div className={styles.innerNavigationBar}>
                <div className={styles.navigationBarItem} onClick={() => { router.back() }}>
                    <FiChevronLeft className={styles.navigationBarIcon} />
                    <span style={poppinsMedium.style}>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default InnerNav