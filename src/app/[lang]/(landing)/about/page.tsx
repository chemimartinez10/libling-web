import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.png'
import meetImg from '@/app/img/Capa_Logo.png'
import placesImg from '@/app/img/places.jpg'
import calendarImg from '@/app/img/calendar.jpg'
import houseImg from '@/app/img/house.jpg'
import planBasic from '@/app/img/plan_basic.jpg'
import planNormal from '@/app/img/plan_normal.jpg'
import planPremium from '@/app/img/plan_premium.jpg'
import locationImg from '@/app/img/location.jpg'
import timeImg from '@/app/img/time.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaUmbrellaBeach, FaMagnifyingGlass, FaPenFancy, FaVanShuttle, FaVideo, FaNewspaper, FaMapLocationDot, FaHourglassHalf, FaBoxOpen } from "react-icons/fa6";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
import { dict } from '@/app/utils'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Services: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.about

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}

        </div>
        <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section reverse={true}>
        <Article subtitle={glosary.sectionTitle_2} content={glosary.sectionContent_2} />
        <Image src={placesImg} id='places-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_3} content={glosary.sectionContent_3} />
        <Image src={houseImg} id='house-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services