'use client'
import React from 'react'
import styles from './page.module.css'
import globalStyles from '@/app/globals.module.css'
import imagen1 from '@/app/img/Recurso 35.png'
import imagen2 from '@/app/img/Recurso 33.png'
import imagen3 from '@/app/img/Recurso 36.png'
import Section from '@/app/components/section'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import HeaderServices from '@/app/components/headerServices'
import AffiliatePlanList from '@/app/components/affiliatePlanList'
import IconCheck from '@/app/components/icons/iconCheck'
import ConsultCard from '@/app/components/consultCard'
import ServiceCard from '@/app/components/serviceCard'
import { ScheduleBanner } from '@/app/components/scheduleBanner'
import PackagePlanList from '@/app/components/packagePlanList'
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
    router.push(`/contact?pack=${pack}#contactForm`, { scroll: true })
  }
  const serviceCardList = [
    glosary.aditionalService_1, 
    glosary.aditionalService_2, 
    glosary.aditionalService_3
  ]
  const consultList = [
    {
      title: glosary.aditionalConsultTitle_1,
      content: glosary.aditionalConsultContent_1,
      align: "start",
    },
    {
      title: glosary.aditionalConsultTitle_2,
      content: glosary.aditionalConsultContent_2,
      border: true
    },
    {
      title: glosary.aditionalConsultTitle_3,
      content: glosary.aditionalConsultContent_3,
      align: "end",
    },
    {
      title: glosary.aditionalConsultTitle_4,
      content: glosary.aditionalConsultContent_4,
      align: "start",
    },
    {
      title: glosary.aditionalConsultTitle_5,
      content: glosary.aditionalConsultContent_5,
      border: true
    },
    {
      title: glosary.aditionalConsultTitle_6,
      content: glosary.aditionalConsultContent_6,
      align: "end",
    },
  ]
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
  ]
  return (
    <main className={styles.main}>
      <HeaderServices lang={lang} />
      <Section backgroundColor='#EDF0F4' vertical={true} title={glosary.sectionTitle_1} subtitle={glosary.sectionSubtitle_1} resume={glosary.sectionContent_1_1 + glosary.sectionContent_1_2}>
        <AffiliatePlanList lang={lang} />
      </Section>

      <Section reverse={true} backgroundColor='linear-gradient(129.72deg, #1973FA 17.02%, #2A3DC8 74.17%)' title={glosary.sectionTitle_1} subtitle={glosary.sectionSubtitle_2} negative={true} vertical={true}>
        <ul className={styles.benefitList}>
          {glosary.sectionList_2.map((el, index) => (<li className={styles.benefitItem} key={index}>
            <div className={styles.iconList}>
              <IconCheck fill='#FFFFFFBD' />
            </div>
            <span className={[globalStyles.subtitle, globalStyles.textNegative].join(' ')}>
              {el}
            </span>
          </li>))}
        </ul>
      </Section>

      <Section title={glosary.sectionTitle_3} subtitle={glosary.sectionSubtitle_3} resume={glosary.sectionContent_3} vertical={true} backgroundColor='#D2DAE1' space={true} >
      </Section>
      <Section backgroundColor='#EDF0F4'>
        <PackagePlanList lang={lang} action={onRequest}/>
        <div className={styles.transparentBox}></div>
      </Section>
      <Section title={glosary.sectionTitle_4} subtitle={glosary.sectionSubtitle_4} resume={glosary.sectionContent_4} vertical={true} backgroundColor='#EDF0F4'>
        <ul className={styles.consultList}>
          {consultList.map((el, index) => (<ConsultCard key={index} title={el.title} content={el.content} align={el?.align} border={el?.border} />))}
        </ul>
      </Section>
      <Section title={glosary.sectionTitle_5} subtitle={glosary.sectionSubtitle_5} vertical={true} backgroundColor='#EDF0F4'>
        <ul className={styles.serviceCardList}>
          {serviceCardList.map((el, index) => (<ServiceCard key={index} title={el} />))}
        </ul>
      </Section>
      <ScheduleBanner lang={lang}/>
    </main>
  )
}

export default Services