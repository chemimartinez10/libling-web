'use client'
import React, { useState } from 'react'
import styles from './body.module.css'
import { ToastContainer } from 'react-toastify';
import Aside from './aside';
import { poppinsRegular } from '@/app/fonts';
import Navbar from './navbar';

export const Body = ({
    children,
    lang
}: {
    children: React.ReactNode,
    lang: "es" | "en" | "fr"

}) => {
    const [open, setOpen] = useState<boolean>(false)
    const toggleOpen = ()=>{setOpen(state => !state)}
    return (
        <body style={poppinsRegular.style} className={styles.layout}>
            <Navbar lang={lang} handleAside={toggleOpen} />
            <div className={styles.container}>
                <Aside lang={lang} open={open} />
                <main className={styles.main}>
                    <div className={styles.titleBar}>
                        
                    </div>
                    <section className={styles.section}>
                        {children}
                    </section>
                    <div className={styles.footerBar}>
                        © Libling 2024
                    </div>
                </main>
            </div>
            <ToastContainer />
        </body>
    )
}
