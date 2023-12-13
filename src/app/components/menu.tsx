'use client'
import styles from './menu.module.css'
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from 'react'
import Link from 'next/link';
import { poppinsBold } from '../fonts';

const Menu = () => {
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
                        <li style={poppinsBold.style} onClick={close}><Link href={'/about'}>Quienes somos</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/'}>Home</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/services'}>Servicios</Link></li>
                        <li style={poppinsBold.style} onClick={close}><Link href={'/contact'}>Contacto</Link></li>
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