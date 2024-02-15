'use client'
import React, { useState } from 'react'
import styles from './countrySelector.module.css'
import spainImg from '@/app/img/spain.png'
import franceImg from '@/app/img/france.png'
import englandImg from '@/app/img/england.png'
import Image from 'next/image'

export const CountrySelector = ({ lang }: { lang: "es" | "en" | "fr" }) => {
    const flags = {
        'es': spainImg,
        'en': englandImg,
        'fr': franceImg,
    }
    const [open, setOpen] = useState(false)

    const handleClick = (currLang: string) => {
        console.log(lang, currLang)
        if (currLang) {
            let currentLocation = window.location.href
            console.log('current location', currentLocation)
            currentLocation = currentLocation.replace(`/${lang}`, `/${currLang}`)
            console.log('new location', currentLocation)
            document.cookie = `NEXT_LOCALE=${currLang}; max-age=31536000; path=/`
            console.log(document.cookie)
            window.location.href = currentLocation

        }
    }
  return (
      <div>
          <div className={styles.selectedLang} onClick={() => { setOpen(state => !state) }}>
              <Image alt={lang} src={flags[lang]} width={24} height={24} style={{ width: 24, height: 24 }} />
          </div>
          <div className={open ? styles.langListActive : styles.langList}>
              <Image alt='esp' src={spainImg} onClick={() => { handleClick('es') }} width={24} height={24} style={{ width: 24, height: 24 }} />
              <Image alt='eng' src={englandImg} onClick={() => { handleClick('en') }} width={24} height={24} style={{ width: 24, height: 24 }} />
              <Image alt='fra' src={franceImg} onClick={() => { handleClick('fr') }} width={24} height={24} style={{ width: 24, height: 24 }} />
          </div>
      </div>
  )
}
