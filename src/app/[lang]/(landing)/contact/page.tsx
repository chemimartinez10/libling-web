"use client"

import React from 'react'
import './calendar.css';
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.gif'
import familyImg from '@/app/img/big_family.png'
import Article from '@/app/components/article'
import { RiWhatsappLine, RiInstagramLine, RiMessengerLine, RiLinkedinFill } from "react-icons/ri";
import Section from '@/app/components/section'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'
import { dict } from '@/app/utils'
import { Calendar } from 'react-calendar'
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import useWindowDimensions from '@/app/hooks/useWindowDimensions';

interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Contact: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.contact
  const { height, width } = useWindowDimensions();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}

        </div>
        {
          (width && width < 600)
            ?
            <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
            :
            <video src={"/en/videos/contact_video.mp4"} autoPlay muted loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}></video>
        }
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} image={familyImg}/>
        <div className={styles.calendar}>
          <h3 style={poppinsMedium.style}>{glosary.calendarTitle}</h3>
          <Calendar locale={lang} className={poppinsRegular.className}/>
        </div>
      </Section>
      <Section title={glosary.sectionTitle_2} resume={glosary.sectionContent_2}>
        <div className={styles.listContactCards}>
          <ContactCard description='+897287298724' url={`https://api.whatsapp.com/send?phone=${352691217216}`} Icon={RiWhatsappLine} color={'#659E43'}/>
          <ContactCard description='+897287298724' url='https://m.me/libling_solutions' Icon={RiMessengerLine} color={'#225FE7'} />
          <ContactCard description='+897287298724' url='https://www.instagram.com/libling_solutions' Icon={RiInstagramLine} color={'#FB8501'} />
          <ContactCard description='+897287298724' url='https://www.linkedin.com/company/libling/' Icon={RiLinkedinFill} color={'#F0C712'} />
        </div>
      </Section>
      <Section vertical={true}>
        <ContactForm lang={lang}/>
      </Section>
    </main>
  )
}

export default Contact