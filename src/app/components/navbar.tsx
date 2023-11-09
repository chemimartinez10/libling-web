import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <ul>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/services'}>Services</Link></li>
            <li><Link href={'/contact'}>Contact</Link></li>
        </ul>
    )
}
