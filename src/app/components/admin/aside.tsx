'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { poppinsBold, poppinsMedium } from '@/app/fonts';
import styles from './aside.module.css'
import { IRoute } from './body';

export default function Aside({ lang, open = false, routes }: { lang: "es" | "en" | "fr", open: boolean, routes:IRoute[] }) {
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
                                !!el.icon && <el.icon className={verifyCurrentLink(el.uri) ? styles.asideItemIconSelected : styles.asideItemIcon} />
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
