import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import luxemburgImg from '../img/Capa_1.png'
import { poppinsBold } from '../fonts'
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contactInfo}>
                <h4 style={poppinsBold.style}>Contacto</h4>
                <p>
                    72 rue Jean François
                </p>
                <p>
                    boch L-1244
                </p>
                <p>
                    +352691217216
                </p>
                <p>
                    liblinglc@gmail.com
                </p>
            </div>
            <div className={styles.luxemburgContainer}>
            <Image src={luxemburgImg} alt='madeInLuxemburg' width={96} height={77}/>

            </div>
            <div className={styles.contactInfo}>
                <h4 style={poppinsBold.style}>Deja tu mensaje y te contactaremos</h4>
                <input type="text" name="some" id="" />
                <div className={styles.socialContainer}>
                    <h4 style={poppinsBold.style}>Síguenos</h4>
                    <div className={styles.socialIconsContainer}>
                        <div className={styles.icon}>
                            <RiFacebookFill />
                        </div>
                        <div className={styles.icon}>
                            <RiInstagramFill />
                        </div>
                        <div className={styles.icon}>
                            <RiLinkedinFill />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
