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
        <Image src={placesImg} id='places-img' width={450} height={450} style={{ borderRadius: 24, padding:10, objectFit:'cover' }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 450px, 450px' layout="responsive" />
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