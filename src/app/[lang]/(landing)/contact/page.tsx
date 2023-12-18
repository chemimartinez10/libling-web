"use client"

import React from 'react'
import 'react-calendar/dist/Calendar.css';
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.png'
import familyImg from '@/app/img/family.png'
import Article from '@/app/components/article'
import { RiWhatsappLine, RiInstagramLine, RiMessengerLine, RiLinkedinFill } from "react-icons/ri";
import Section from '@/app/components/section'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'
import { dict } from '@/app/utils'
import { Calendar } from 'react-calendar'

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
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} bigSubtitle={true} image={familyImg}/>
        <div className={styles.calendar}>
          <Calendar locale={lang} className={styles.calendarForm}/>
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