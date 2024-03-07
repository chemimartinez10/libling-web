'use client'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/home_banner.gif'
import travelImg from '@/app/img/Recurso 18 1.png'
import teamImg from '@/app/img/Recurso 20 1.png'
import familyImg from '@/app/img/family.png'
import alarmImg from '@/app/img/Recurso 22 1.png'
import Recurso3 from '@/app/img/Recurso 3.png'
import Recurso4 from '@/app/img/Recurso 4.png'
import Recurso5 from '@/app/img/Recurso 5.png'
import Recurso6 from '@/app/img/Recurso 6.png'

import Testigo1 from '@/app/img/contact_1.png'
import Testigo2 from '@/app/img/contact_2.png'
import Testigo3 from '@/app/img/contact_3.png'

import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Review from '@/app/components/review'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.home
  const { height, width } = useWindowDimensions();

  const listaBeneficios = [
    {
      title: glosary.sectionList_3[0],
      img: Recurso3
    },
    {
      title: glosary.sectionList_3[1],
      img: Recurso4
    },
    {
      title: glosary.sectionList_3[2],
      img: Recurso5
    },
    {
      title: glosary.sectionList_3[3],
      img: Recurso6
    },
  ]
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
        {
          (width && width < 600)
            ?
            <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
            :
            <video autoPlay muted={true} loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}>
              <source src={"/en/videos/home_video.webm"} type="video/webm" />
              <source src={"/en/videos/home_video.mp4"} type="video/mp4" />
            </video>
        }
        
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} buttonText={glosary.sectionButton_1} buttonAction='/contact' />
        <Image src={travelImg} id='travel-img' width={490} height={465} style={{ borderRadius: 24, maxWidth: 490 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 490px' layout="responsive" />
      </Section>
      <Section reverse={true}>
        <Article subtitle={glosary.sectionTitle_2} content={glosary.sectionContent_2} buttonText={glosary.sectionButton_2} buttonAction='/services' />
        <Image src={teamImg} width={674} height={575} style={{ borderRadius: 24, maxWidth: 490, flexShrink:1 }} alt='family' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 500px, 674px' layout="responsive" />
      </Section>
      <Section vertical={true} subtitle={glosary.sectionTitle_3} space={true} backgroundColor={'transparent'}>
        <div className={styles.listHighlights}>
          {
            listaBeneficios.map((el, index) => (<Highlight key={index} title={el?.title} alt={`highlight${index}`} img={el?.img} description={el?.title} />))
          }
        </div>

      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_4} list={glosary.sectionList_4} />
        <Image src={familyImg} width={558} height={631} style={{ borderRadius: 24, maxWidth: 520 }} className={styles.image} alt='work' sizes='(max-width: 768px) 558px, (max-width: 1120px) 380px, 558px' layout="responsive" />

      </Section>
      {/* <Section>
        <div className={styles.listReview}>
          <Review title={glosary.reviewName_1} img={Testigo1} description={glosary.reviewDescription_1} />
          <Review title={glosary.reviewName_2} img={Testigo2} description={glosary.reviewDescription_2} />
          <Review title={glosary.reviewName_3} img={Testigo3} description={glosary.reviewDescription_3} />
        </div>
      </Section> */}
    </main>
  )
}

export default Home