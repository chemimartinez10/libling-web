'use client'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { logOut } from '@/app/actions';
import { dict } from '@/app/utils';
import { usePathname } from 'next/navigation';
import LogoSVG from '../../img/Recurso 1 1.svg'
import Image from 'next/image';
import Link from 'next/link';
import { poppinsBold, poppinsMedium } from '@/app/fonts';
import { CountrySelector } from '../countrySelector';
import LogoNavSVG from '../icons/logoNavSVG';
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi'
import { useSession } from "next-auth/react"
import { UserDTO } from '@/dto';
import { IUserSession } from '@/services';
import { Button } from './button';


export default function Navbar({ lang, handleAside, user }: { lang: "es" | "en" | "fr", handleAside: VoidFunction, user?: IUserSession }) {
    const glosary = dict[lang]?.adminNav
    const routes = [
        {
            name: glosary.dashboardTitle,
            uri: '/admin/dashboard'
        },
        {
            name: glosary.propertiesTitle,
            uri: '/admin/properties'
        },
    ]
    const pathname = usePathname()
    const verifyCurrentLink = (site: string) => {
        let currentLocation = pathname
        if (currentLocation.includes(site)) return true
        return false
    }
    const [showMenu, setShowMenu] = useState<boolean>(false)
    return (<>
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <div onClick={handleAside}>
                    <FiMenu className={styles.menuIcon} />

                </div>
                <LogoNavSVG />
            </div>
            <div className={styles.userContainer}>
                <div className={styles.formSelector}>
                    <CountrySelector lang={lang} />
                </div>
                <div className={styles.userData}>
                    <span>{user?.name}</span>
                    <div className={styles.userRole} onClick={() => { setShowMenu(state => !state) }}>
                        <span>Admin</span>
                        {
                            showMenu
                                ?
                                <FiChevronUp className={styles.roleIcon} />
                                :
                                <FiChevronDown className={styles.roleIcon} />
                        }
                    </div>
                    <div className={styles.menu} style={{ display: showMenu ? 'block' : 'none' }}>
                        <Button title={glosary.closeSession} onClick={async () => {
                            await logOut();
                        }} />
                    </div>
                </div>

                <div style={{ width: 35, height: 35, backgroundColor: '#fff', borderRadius: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', textTransform: 'uppercase', color: '#1973FA', fontSize: 16 }}>
                    a
                </div>
            </div>
        </nav>
    </>
    )
}
