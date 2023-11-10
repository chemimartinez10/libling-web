import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.innernav}>
            <div className={styles.logoContainer}>
                <h2>Logo</h2>
            </div>
            <ul>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/services'}>Services</Link></li>
                <li><Link href={'/contact'}>Contact</Link></li>
            </ul>
            </div>
        </nav>
    )
}
