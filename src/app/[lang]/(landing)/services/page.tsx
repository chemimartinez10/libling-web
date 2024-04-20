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
import imagen1 from '@/app/img/Recurso 35.png'
import imagen2 from '@/app/img/Recurso 33.png'
import imagen3 from '@/app/img/Recurso 36.png'
import imagen4 from '@/app/img/Recurso 37.png'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import CardHorizontal from '@/app/components/cardHorizontal'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Services: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.services
  const { height, width } = useWindowDimensions();
  const router = useRouter()
  const onRequest = (pack: string) => {
    router.push(`/contact?pack=${pack}#contactForm`, {scroll:true})
  }
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
            <video autoPlay muted={true} loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}>
              <source src={"/en/videos/services_video.webm"} type="video/webm" />
              <source src={"/en/videos/services_video.mp4"} type="video/mp4" />
            </video>
        }
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24, padding: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section vertical={true} subtitle={glosary.sectionTitle_2}>
        <div className={styles.listCard}>
          <Card title={glosary.cardTitle_1}  list={glosary.cardList_1} image={planBasic} actionText={glosary.cardActionText} action={() => { onRequest(glosary.cardTitle_1) }} />
          <Card title={glosary.cardTitle_2}  list={glosary.cardList_2} image={planNormal} actionText={glosary.cardActionText} action={() => { onRequest(glosary.cardTitle_2) }} />
          <Card title={glosary.cardTitle_3}  list={glosary.cardList_3} image={planPremium} actionText={glosary.cardActionText} action={() => { onRequest(glosary.cardTitle_3) }} />
          {
            (width && width < 1100) &&
            <Card title={glosary.cardTitle_4} list={glosary.cardList_4} image={planPremium} actionText={glosary.cardActionText} action={() => { onRequest(glosary.cardTitle_4) }} />
          }
        </div>
        {
          (width && width >= 1100) &&
          <CardHorizontal title={glosary.cardTitle_4} list={glosary.cardList_4} image={planPremium} actionText={glosary.cardActionText} action={() => { onRequest(glosary.cardTitle_4) }} />
        }
      </Section>
      <Section reverse={true}>
        <Article subtitle={glosary.sectionTitle_3} content={glosary.sectionContent_3} />
        <Image src={placesImg} id='places-img' width={600} height={600} style={{ borderRadius: 24, padding: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_4} content={glosary.sectionContent_4} />
        <Image src={houseImg} id='house-img' width={600} height={600} style={{ borderRadius: 24, padding: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>

      <Section vertical={true} subtitle={glosary.aditionalTitle_1}>
        <div className={styles.listServices}>
          {
            serviciosAdicionales.map((el, index) => (<MiniCard key={index} alt={`minicard${index}`} description={el?.description} img={el?.img} />))
          }
        </div>

      </Section>
      <Section>
        <Article subtitle={glosary.sectionTitle_5} content={glosary.sectionContent_5} buttonText={glosary.sectionButton_5} buttonAction='/contact' />
        <Image src={calendarImg} width={400} height={400} style={{ borderRadius: 24 }} alt='work' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 350px, 400px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services