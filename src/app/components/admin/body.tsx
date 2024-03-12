'use client'
import React, { useEffect, useState } from 'react'
import styles from './body.module.css'
import { ToastContainer } from 'react-toastify';
import Aside from './aside';
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import Navbar from './navbar';
import { dict } from '@/app/utils';
import { FiHome } from 'react-icons/fi';
import { IUserSession } from '@/services';
import ActionBar from './actionBar';
import useStore from '@/app/hooks/useStore';
import { useInterfaceStore } from '@/app/hooks/useInterfaceStore';

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
    lang,
    user
}: {
    children: React.ReactNode,
    lang: "es" | "en" | "fr",
    user?: IUserSession

}) => {
    const [open, setOpen] = useState<boolean>(false)
    const glosary = dict[lang]?.adminNav
    const store = useStore(useInterfaceStore, (state) => state)


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
    useEffect(() => {
        if (store?.setUser) {
            store.setUser(user)
        }
        console.log('render')
    }, [store?.setUser, user])
    return (
        <body style={poppinsRegular.style} className={styles.layout}>
            {
                store?.loading
                &&
                <div className={styles.overlayLoader}>
                    <span className={styles.loader}></span>
                </div>
            }
            <Navbar lang={lang} handleAside={toggleOpen} user={user} />
            <div className={!!store?.showBar && !!store?.barContent ? styles.containerBar : styles.container}>
                <Aside lang={lang} open={open} routes={routes} />
                <main className={styles.main}>
                    {children}
                    <div className={styles.footerBar}>
                        © Libling 2024
                    </div>
                </main>
            </div>
            {
                (!!store?.showBar && !!store?.barContent)
                &&
                <ActionBar show={!!store?.showBar} Content={store?.barContent} />
            }
            <ToastContainer />
        </body>
    )
}
