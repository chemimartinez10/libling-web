import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/header_2.jpg'
import travelImg from '@/app/img/travel.jpg'
import familyImg from '@/app/img/family.jpg'
import alarmImg from '@/app/img/alarm.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaPeopleCarryBox, FaPeopleRoof, FaPersonWalkingLuggage, FaVanShuttle, FaVideo, FaNewspaper, FaMapLocationDot, FaHourglassHalf } from "react-icons/fa6";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
interface IPage {
  params: {
    lang: string
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  const listaBeneficios = [
    {
      title:'Lorem, ipsum.',
      icon: FaVanShuttle
    },
    {
      title:'Lorem, ipsum.',
      icon: FaVideo
    },
    {
      title:'Lorem, ipsum.',
      icon: FaNewspaper
    },
    {
      title:'Lorem, ipsum.',
      icon: FaMapLocationDot
    },
    {
      title:'Lorem, ipsum.',
      icon: FaHourglassHalf
    },
  ]
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}
          <h1 className={poppinsSemiBold.className}>Libling</h1>
          <AnimatedText />
          <h4>Sabemos lo difícil que es empezar desde cero, es por ello que nosotros te ayudaremos a que tu proceso de relocalización sea el más cómodo y reconfortante para ti y tus seres queridos.</h4>
          <div className={styles.buttonContainer}>
            <Button text='Agendar' alternativeColor={true}>
              <FiCalendar />
            </Button>
            <Button text='Contactar'>
              <FiMail />
            </Button>
          </div>
        </div>
        <Image src={headerImg} alt='header image' width={1200} height={600} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }}/>
      </header>
      <Section>
        <Article subtitle='Estamos a tu lado para ayudarte en lo que necesites' content='Te brindaremos apoyo durante tu proceso de adaptación facilitándote toda la información que necesitas para que puedas vivir una vida de calidad en Luxemburgo.
' Icon={FaPersonWalkingLuggage} />
        <Image src={travelImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section reverse={true}>
        <Article subtitle='Juntos podremos lograrlo' content='Empezar en un país distinto a veces puede ser retador, pero no te preocupes.  Estaremos contigo para facilitarte los procesos administrativos, legales y culturales para que puedas adaptarte rápidamente en la comunidad Luxemburguesa.' Icon={FaPeopleRoof} />
        <Image src={familyImg} width={600} height={400} style={{ borderRadius: 24 }} alt='family' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section vertical={true} title='Servicios'>
        <Article subtitle='Tenemos para ofecerte'/>
        <div className={styles.listHighlights}>
            {
            listaBeneficios.map((el, index) => (<Highlight key={index} title={el?.title} alt={`highlight${index}`} Icon={el?.icon}/>))
            }
        </div>

      </Section>
      <Section reverse={true}>
        <Article subtitle='Estaremos allí para ti' content='Libling ofrece que tu proceso de adaptación sea el más reconfortante y más tranquilo posible, ofreciendo los siguientes servicios:' list={[
          "Solicitud de Permiso de Trabajo / Autorización Temporal",
          "Requisitos del Permiso de Residencia a la llegada - Cita médica, Rayos X, prueba de tuberculosis, declaración de llegada(Principal)",
          "Biometría acompañada",
          "Solicitud de Permiso de Residencia por persona extra(cónyuge / pareja / hijos) si no se realiza al mismo tiempo",
          "Renovación de permisos de trabajo y residencia",
        ]} Icon={FaPeopleCarryBox} />
        <Image src={alarmImg} width={500} height={500} style={{ borderRadius: 24 }} alt='work' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />

      </Section>
    </main>
  )
}

export default Home