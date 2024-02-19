'use client'
import React, { useState } from 'react'
import { dict } from '@/app/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { poppinsBold, poppinsMedium } from '@/app/fonts';
import { FiHome } from 'react-icons/fi'
import styles from './aside.module.css'

export default function Aside({ lang, open = false }: { lang: "es" | "en" | "fr", open: boolean }) {
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
    const pathname = usePathname()
    const verifyCurrentLink = (site: string) => {
        let currentLocation = pathname
        if (currentLocation.includes(site)) return true
        return false
    }
    return (<>
        <aside className={open ? styles.aside : styles.asideClosed}>
            <Link href={routes[0].uri}>
                <span className={styles.asideTitle} style={poppinsMedium.style}>{routes[0].name}</span>
            </Link>
            {
                routes.slice(1).map((el, index) => (
                    <Link href={el.uri} key={index}>
                        <div className={verifyCurrentLink(el.uri) ? styles.asideItemSelected : styles.asideItem}>
                            {
                                !!el.icon && <el.icon className={styles.asideItemIcon} />
                            }
                            <span className={styles.asideItemText}>{el.name}</span>
                        </div>
                    </Link>
                ))
            }
        </aside>
    </>
    )
}
