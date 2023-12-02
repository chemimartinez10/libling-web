import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/home_banner.png'
import travelImg from '@/app/img/Recurso 18 1.png'
import familyImg from '@/app/img/Recurso 20 1.png'
import alarmImg from '@/app/img/Recurso 22 1.png'
import Recurso3 from '@/app/img/Recurso 3.png'
import Recurso4 from '@/app/img/Recurso 4.png'
import Recurso5 from '@/app/img/Recurso 5.png'
import Recurso6 from '@/app/img/Recurso 6.png'

import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaPeopleCarryBox, FaPeopleRoof, FaPersonWalkingLuggage, FaVanShuttle, FaVideo, FaNewspaper, FaMapLocationDot, FaHourglassHalf } from "react-icons/fa6";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Card from '@/app/components/card'
interface IPage {
  params: {
    lang: string
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  const listaBeneficios = [
    {
      title: 'Lorem, ipsum.',
      img: Recurso3
    },
    {
      title: 'Lorem, ipsum.',
      img: Recurso4
    },
    {
      title: 'Lorem, ipsum.',
      img: Recurso5
    },
    {
      title: 'Lorem, ipsum.',
      img: Recurso6
    },
  ]
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}
          {/* <h1 className={poppinsSemiBold.className}>Libling</h1>
          <AnimatedText /> */}
          <div className={styles.textContainer}>
            <h4 style={poppinsBold.style}>Transforma tu vida en Luxemburgo</h4>
            <h4 style={poppinsBold.style}>con nuestra asesoría.</h4>

          </div>
          {/* <div className={styles.buttonContainer}>
            <Button text='Agendar' alternativeColor={true}>
              <FiCalendar />
            </Button>
            <Button text='Contactar'>
              <FiMail />
            </Button>
          </div> */}
        </div>
        <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle='Estamos a tu lado para ayudarte en lo que necesites' content='Te brindaremos apoyo durante tu proceso de adaptación facilitando toda la información que necesitas  para que puedas vivir una vida de calidad en Luxemburgo.
'  />
        <Image src={travelImg} id='travel-img' width={490} height={465} style={{ borderRadius: 24, maxWidth:490 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 490px' layout="responsive" />
      </Section>
      <Section reverse={true}>
        <Article subtitle='Juntos podremos lograrlo' content='Empezar en un país distinto a veces puede ser retador, pero no te preocupes.  Estaremos contigo para facilitarte los procesos administrativos, legales y culturales para que puedas adaptarte rápidamente en la comunidad Luxemburguesa.' />
        <Image src={familyImg} width={674} height={575} style={{ borderRadius: 24, maxWidth:674 }} alt='family' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 500px, 674px' layout="responsive" />
      </Section>
      <Section vertical={true} subtitle='Nuestros servicios:'>
        <div className={styles.listHighlights}>
          {
            listaBeneficios.map((el, index) => (<Highlight key={index} title={el?.title} alt={`highlight${index}`} img={el?.img} />))
          }
        </div>

      </Section>
      <Section>
        <Article subtitle='Te ayudamos a gestionar y asesorar' list={[
          "Solicitud de Permiso de Trabajo / Autorización Temporal",
          "Requisitos de Permiso de Residencia",
          "Renovación de permisos de trabajo y residencia",
          "Búsqueda de escuelas para tus hijos."

        ]} />
        <Image src={alarmImg} width={558} height={631} style={{ borderRadius: 24, maxWidth:558 }} alt='work' sizes='(max-width: 768px) 558px, (max-width: 1120px) 380px, 558px' layout="responsive" />

      </Section>
      <Section>
        
      </Section>
    </main>
  )
}

export default Home