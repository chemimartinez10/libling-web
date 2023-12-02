import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import LogoSVG from '../img/Recurso 1 1.svg'
import Image from 'next/image'
import { poppinsBold } from '../fonts'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.innernav}>
                <div className={styles.logoContainer}>
                    <Image src={LogoSVG} width={191} height={58} alt='Logo' />
                </div>
                <ul style={poppinsBold.style}>
                    <li><Link href={'/about'}>Quienes somos</Link></li>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/services'}>Servicios</Link></li>
                    <li><Link href={'/contact'}>Contacto</Link></li>
                </ul>
            </div>
        </nav>
    )
}
