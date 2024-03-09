'use client'
import React, { useEffect, useState } from 'react'
import styles from './countrySelector.module.css'
import spainImg from '@/app/img/spain.png'
import luxemburgImg from '@/app/img/luxembourg.png'
import emiratesImg from '@/app/img/united-arab-emirates.png'
import earthImg from '@/app/img/earth.png'
import Image from 'next/image'
import { ICountry, ILang, countryType } from '../interfaces'
import { dict } from '../utils'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { poppinsMedium } from '../fonts'
import { useRouter } from 'next/navigation'

export const CountrySelector = ({ country, lang }: ICountry & ILang) => {
    const flags = {
        'ES': spainImg,
        'AE': emiratesImg,
        'LU': luxemburgImg,
        'ALL':earthImg,
    }
    const [open, setOpen] = useState(false)
    const [currentCountry, setCurrentCountry] = useState<countryType | undefined>(hasCookie('immo-country') ? getCookie('immo-country') as countryType : country)
    const glosary = dict[lang].immo
    const router = useRouter()

    const handleClick = (currCountry: countryType) => {
        if (currCountry in flags) {
            setCurrentCountry(currCountry)
            setCookie('immo-country', currCountry)
            setOpen(false)
            router.refresh()
        }
    }
    return (<>
        {
            !!currentCountry &&
            <div className={styles.container} onBlurCapture={() => { setOpen(false) }}>
                <div className={styles.selectedLangImmo} onClick={() => { setOpen(state => !state) }} >
                    <Image alt={currentCountry} src={flags[currentCountry]} width={24} height={24} className={styles.flag} />
                    {
                        currentCountry === 'ES' && <span className={styles.langHeader} style={poppinsMedium.style}>{glosary.spain}</span>
                    }
                    {
                        currentCountry === 'AE' && <span className={styles.langHeader} style={poppinsMedium.style}>{glosary.emirates}</span>
                    }
                    {
                        currentCountry === 'LU' && <span className={styles.langHeader} style={poppinsMedium.style}>{glosary.luxemburg}</span>
                    }
                    {
                        currentCountry === 'ALL' && <span className={styles.langHeader} style={poppinsMedium.style}>{glosary.earth}</span>
                    }
                    {
                        !!open
                            ?
                            <FiChevronUp className={styles.icon} />
                            :
                            <FiChevronDown className={styles.icon} />
                    }
                </div>
                <div className={open ? styles.langListActive : styles.langList}>
                    <div className={styles.countryItem} onClick={() => { handleClick('ES') }}>
                        <Image alt='esp' src={spainImg} width={24} height={24} className={styles.flag} />
                        <span className={currentCountry === 'ES' ? styles.langTitleSelected : styles.langTitle}>{glosary.spain}</span>
                        <span className={styles.langPlaceholder}>(ES)</span>
                    </div>
                    <div className={styles.countryItem} onClick={() => { handleClick('AE') }}>
                        <Image alt='aeu' src={emiratesImg} width={24} height={24} className={styles.flag} />
                        <span className={currentCountry === 'AE' ? styles.langTitleSelected : styles.langTitle}>{glosary.emirates}</span>
                        <span className={styles.langPlaceholder}>(AE)</span>
                    </div>
                    <div className={styles.countryItem} onClick={() => { handleClick('LU') }}>
                        <Image alt='lux' src={luxemburgImg} width={24} height={24} className={styles.flag} />
                        <span className={currentCountry === 'LU' ? styles.langTitleSelected : styles.langTitle}>{glosary.luxemburg}</span>
                        <span className={styles.langPlaceholder}>(LU)</span>
                    </div>
                    <div className={styles.countryItem} onClick={() => { handleClick('ALL') }}>
                        <Image alt='lux' src={earthImg} width={24} height={24} className={styles.flag} />
                        <span className={currentCountry === 'ALL' ? styles.langTitleSelected : styles.langTitle}>{glosary.earth}</span>
                    </div>
                </div>
            </div>
        }
    </>
    )
}
