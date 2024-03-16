'use client'
import styles from './menu.module.css'
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from 'react'
import Link from 'next/link';
import { poppinsBold } from '../fonts';
import { dict } from '../utils';

const Menu = ({ lang, alt = false }: { lang: "es" | "en" | "fr", alt?: boolean }) => {
    const glosary = dict[lang]?.navbar
    const glosaryAuth = dict[lang]?.auth
    const [open, setOpen] = useState(false)
    const close = () => {
        setOpen(false)
    }
    return (
        <div className={alt ? styles.containerAlt : styles.container}>
            <ul className={open ? alt ? styles.menuContainerOpenAlt : styles.menuContainerOpen : alt ? styles.menuContainerAlt : styles.menuContainer} onClick={close}>
                {
                    !!open &&
                    <>
                        {
                            alt ?
                                <>
                                    <li style={poppinsBold.style} ><Link href={'/'}>{'Libling relocation'}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/auth/login'}>{glosaryAuth.login_button}</Link></li>
                                </>
                                :
                                <>
                                    <li style={poppinsBold.style} ><Link href={'/'}>{glosary.link_2}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/immo'}>{'Libling immo'}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/services'}>{glosary.link_3}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/about'}>{glosary.link_1}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/contact'}>{glosary.link_4}</Link></li>
                                    <li style={poppinsBold.style} ><Link href={'/auth/login'}>{glosaryAuth.login_button}</Link></li>
                                </>

                        }
                    </>
                }
            </ul>
            <div className={alt ? styles.circleContainerAlt : styles.circleContainer} onClick={() => {
                setOpen(state => !state)
            }}>
                {
                    open
                        ?
                        <FaTimes />
                        :
                        <FaBars />
                }
            </div>
        </div>
    )
}

export default Menu