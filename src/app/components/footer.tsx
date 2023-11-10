import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae labore, deserunt iure
            </p>
            <ul>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/services'}>Services</Link></li>
                <li><Link href={'/contact'}>Contact</Link></li>
            </ul>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae labore, deserunt iure
            </p>
        </div>
    )
}
