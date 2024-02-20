'use client'
import React, { useState } from 'react'
import styles from './body.module.css'
import { ToastContainer } from 'react-toastify';
import Aside from './aside';
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import Navbar from './navbar';
import { dict } from '@/app/utils';
import { FiHome } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface IRoute {
    // Name of the route (displayed in navigation elements)
    name: string;

    // URI representing the route path
    uri: string;

    // Optional icon component for navigation display
    icon?: React.ComponentType<any>;
}

export const Body = ({
    children,
    lang
}: {
    children: React.ReactNode,
    lang: "es" | "en" | "fr"

}) => {
    const [open, setOpen] = useState<boolean>(false)
    const glosary = dict[lang]?.adminNav

    const routes = [
        {
            name: glosary.dashboardTitle,
            uri: '/admin/dashboard'
        },
        {
            name: glosary.propertiesTitle,
            uri: '/admin/properties',
            icon: FiHome
        },
    ]
    const toggleOpen = () => { setOpen(state => !state) }
    return (
        <body style={poppinsRegular.style} className={styles.layout}>
            <Navbar lang={lang} handleAside={toggleOpen} />
            <div className={styles.container}>
                <Aside lang={lang} open={open} routes={routes} />
                <main className={styles.main}>
                    {children}
                    <div className={styles.footerBar}>
                        © Libling 2024
                    </div>
                </main>
            </div>
            <ToastContainer />
        </body>
    )
}
