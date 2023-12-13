"use client"

import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.png'
import locationImg from '@/app/img/location.jpg'
import timeImg from '@/app/img/time.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaWhatsapp, FaFacebookMessenger, FaPenFancy, FaInstagram, FaVideo, FaNewspaper, FaLinkedin, FaHourglassHalf, FaBoxOpen } from "react-icons/fa6";
import { RiWhatsappLine, RiInstagramLine, RiMessengerLine, RiLinkedinFill } from "react-icons/ri";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'
import { dict } from '@/app/utils'

interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Contact: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.contact

  

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}

        </div>
        <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} bigSubtitle={true}/>
        <div className={styles.calendar}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            aspectRatio={1}
          />
        </div>
      </Section>
      <Section subtitle={glosary.sectionTitle_2} resume={glosary.sectionContent_2}>
        <div className={styles.listContactCards}>
          <ContactCard description='+897287298724' Icon={RiWhatsappLine} color={'#659E43'}/>
          <ContactCard description='+897287298724' Icon={RiMessengerLine} color={'#225FE7'} />
          <ContactCard description='+897287298724' Icon={RiInstagramLine} color={'#FB8501'} />
          <ContactCard description='+897287298724' Icon={RiLinkedinFill} color={'#F0C712'} />
        </div>
      </Section>
      <Section vertical={true}>
        <ContactForm lang={lang}/>
      </Section>
    </main>
  )
}

export default Contact