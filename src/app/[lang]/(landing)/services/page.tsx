'use client'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/services_banner.gif'
import meetImg from '@/app/img/Recurso 24 1.png'
import placesImg from '@/app/img/Recurso 29 1.png'
import calendarImg from '@/app/img/Recurso 30 1.png'
import houseImg from '@/app/img/Recurso 24 2.png'
import planBasic from '@/app/img/plan_basic.jpg'
import planNormal from '@/app/img/plan_normal.jpg'
import planPremium from '@/app/img/plan_premium.jpg'
import imagen1 from '@/app/img/Image 1.png'
import imagen2 from '@/app/img/Image 2.png'
import imagen3 from '@/app/img/Image 3.png'
import imagen4 from '@/app/img/Image 4.png'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import CardHorizontal from '@/app/components/cardHorizontal'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Services: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.services
  const { height, width } = useWindowDimensions();
  const serviciosAdicionales = [
    {
      img: imagen1,
      description: glosary.aditionalService_1
    },
    {
      img: imagen2,
      description: glosary.aditionalService_2

    },
    {
      img: imagen3,
      description: glosary.aditionalService_3

    },
    {
      img: imagen4,
      description: glosary.aditionalService_4

    },
  ]
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
            <video src={"/en/videos/services_video.mp4"} autoPlay muted loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}></video>
        }
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section vertical={true} subtitle={glosary.sectionTitle_2}>
        <div className={styles.listCard}>
          <Card title={glosary.cardTitle_1} subtitle='50€' list={glosary.cardList_1} image={planBasic} actionText={glosary.cardActionText} actionUrl='solicitud' />
          <Card title={glosary.cardTitle_2} subtitle='70€' list={glosary.cardList_2} image={planNormal} actionText={glosary.cardActionText} actionUrl='solicitud' />
          <Card title={glosary.cardTitle_3} subtitle='90€' list={glosary.cardList_3} image={planPremium} actionText={glosary.cardActionText} actionUrl='solicitud' />
          {
            (width && width < 1100) &&
            <Card title={glosary.cardTitle_4} subtitle='56€' content={glosary.cardDescription_4} image={planPremium} actionText={glosary.cardActionText} actionUrl='solicitud' />
          }
        </div>
        {
          (width && width >= 1100) &&
          <CardHorizontal title={glosary.cardTitle_4} subtitle='56€' content={glosary.cardDescription_4} image={planPremium} actionText={glosary.cardActionText} actionUrl='solicitud' />
        }
      </Section>
      <Section reverse={true}>
        <Article subtitle={glosary.sectionTitle_3} content={glosary.sectionContent_3} />
        <Image src={placesImg} id='places-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_4} content={glosary.sectionContent_4} />
        <Image src={houseImg} id='house-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>

      <Section vertical={true} subtitle='Tenemos más para ti'>
        <div className={styles.listServices}>
          {
            serviciosAdicionales.map((el, index) => (<MiniCard key={index} alt={`minicard${index}`} description={el?.description} img={el?.img} />))
          }
        </div>

      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_5} content={glosary.sectionContent_5} buttonText={glosary.sectionButton_5} />
        <Image src={calendarImg} width={400} height={400} style={{ borderRadius: 24 }} alt='work' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 350px, 400px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services