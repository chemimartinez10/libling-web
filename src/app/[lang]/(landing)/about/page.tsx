import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/about_banner.jpeg'
import meetImg from '@/app/img/Capa_Logo.png'
import placesImg from '@/app/img/CEO_about.jpg'
import houseImg from '@/app/img/house.jpg'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import { dict } from '@/app/utils'
import { poppinsBold } from '@/app/fonts'
import { Metadata } from 'next'
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
      <header className={styles.header}>
        <div className={styles.headerMask}>
          <div className={styles.textContainer}>
            <div>
              <h4 className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_1}</h4>
              <h4 className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_2}</h4>
              <h4 className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_3}</h4>
            </div>
          </div>

        </div>
        <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} />
      </Section>
      <Section reverse={true}>
        <Article subtitle={glosary.sectionTitle_2} content={glosary.sectionContent_2} />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} className={styles.image} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_3} content={glosary.sectionContent_3} />
        <Image src={houseImg} id='house-img' width={600} height={600} style={{ borderRadius: 24, padding:10 }} className={styles.image} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services