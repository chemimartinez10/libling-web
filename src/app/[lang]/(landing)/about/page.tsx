import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import meetImg from '@/app/img/Capa_Logo.png'
import placesImg from '@/app/img/CEO_about.jpg'
import houseImg from '@/app/img/house.jpg'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import { dict } from '@/app/utils'
import { Metadata } from 'next'
import HeaderAbout from '@/app/components/headerAbout'
import AnimatedImage from '@/app/components/animatedImage'
import MoveIMG from '@/app/img/about_section_1.png'
import HelpIMG from '@/app/img/about_section_2.jpeg'
import HousesIMG from '@/app/img/about_section_3.png'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
export const metadata: Metadata = {
  title: 'Relocation - About Us | Libling Solutions',
  description: 'Travel to Luxembourg, providing you with comprehensive service and optimal support in your relocation process to Luxembourg. We are by your side to assist you with whatever you need',
  robots: 'index, follow',
  keywords: ['relocation', 'relocation help', 'experiences on Luxembourg', 'Luxembourg country', 'Libling', 'assist to relocation', 'support to your relocation', 'multilanguages relocation page', 'secure relocation to Luxembourg', 'easy relocation', 'real state on Luxembourg', 'travel to Luxembourg', 'Best option to relocate to Luxembourg', "Relocación","Ayuda para la reubicación","Experiencias en Luxemburgo","Luxemburgo (país)","Asistencia para la reubicación","Apoyo para tu reubicación","Página de reubicación multilingüe","Mudanza segura a Luxemburgo","Mudanza fácil","Bienes raíces en Luxemburgo","Viajar a Luxemburgo","La mejor opción para reubicarse en Luxemburgo","Latinos en Luxemburgo"],
  alternates:
  {
    canonical: "https://libling.lu/about",
    languages: {
      en: "https://libling.lu/en/about",
      es: "https://libling.lu/es/about",
      fr: "https://libling.lu/fr/about",
    }
  }
}
const Services: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.about

  return (
    <main className={styles.main}>
      <HeaderAbout lang={lang}/>
      <Section>
        <AnimatedImage image={MoveIMG} alt={'move'} reverse={true}/>
        <Article title={glosary.sectionTitle_2} subtitle={glosary.sectionSubtitle_2} content={glosary.sectionContent_2_1 + glosary.sectionContent_2_2} buttonText={glosary.actionButton_2} buttonAction='/contact' />
      </Section>
      <Section reverse={true}>
        <AnimatedImage image={HelpIMG} alt={'move'}/>
        <Article title={glosary.sectionTitle_3} subtitle={glosary.sectionSubtitle_3} content={glosary.sectionContent_3_1 + glosary.sectionContent_3_2 + glosary.sectionContent_3_3} buttonText={glosary.actionButton_3} buttonAction='/contact' />
      </Section>
      <Section vertical={true}>
        <Article title={glosary.sectionTitle_4} subtitle={glosary.sectionSubtitle_4_1 + glosary.sectionSubtitle_4_2} content={glosary.sectionContent_4} buttonText={glosary.actionButton_4} buttonAction='/contact' center={true}/>
      </Section>
    </main>
  )
}

export default Services