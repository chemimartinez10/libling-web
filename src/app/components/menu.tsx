'use client'
import styles from './menu.module.css'
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from 'react'
import Link from 'next/link';
import { poppinsBold } from '../fonts';
import { dict } from '../utils';

const Menu = ({ lang }: { lang: "es" | "en" | "fr" }) => {
    const glosary = dict[lang]?.navbar
    const [open, setOpen] = useState(false)
    const close = ()=>{
        setOpen(false)
    }
    return (
        <div className={styles.container}>
            <ul className={open ? styles.menuContainerOpen : styles.menuContainer}>
                {
                    !!open &&
                    <>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/about'}>{glosary.link_1}</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/'}>{glosary.link_2}</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/services'}>{glosary.link_3}</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/contact'}>{glosary.link_4}</Link></li>
                    </>
                }
            </ul>
            <div className={styles.circleContainer} onClick={() => {
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