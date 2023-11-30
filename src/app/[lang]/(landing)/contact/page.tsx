"use client"

import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/migrate.jpg'
import locationImg from '@/app/img/location.jpg'
import timeImg from '@/app/img/time.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaWhatsapp, FaFacebookMessenger, FaPenFancy, FaInstagram, FaVideo, FaNewspaper, FaLinkedin, FaHourglassHalf, FaBoxOpen } from "react-icons/fa6";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'

interface IPage {
  params: {
    lang: string
  }
}
const Contact: React.FC<IPage> = ({ params: { lang } }) => {
  const listaBeneficios = [
    {
      title: 'Lorem, ipsum.',
      img: locationImg,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo veritatis quia qui iste laudantium.'
    },
    {
      title: 'Lorem, ipsum.',
      img: timeImg,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo veritatis quia qui iste laudantium.'

    },
    {
      title: 'Lorem, ipsum.',
      img: locationImg,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo veritatis quia qui iste laudantium.'

    },
    {
      title: 'Lorem, ipsum.',
      img: timeImg,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo veritatis quia qui iste laudantium.'

    },
  ]

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}
          <h1 className={poppinsSemiBold.className}>Libling</h1>
          <AnimatedText />
          <h4>Tenemos una variedad de servicios para complementar tu estancia en el pais</h4>
          <div className={styles.buttonContainer}>
            <Button text='Servicios' alternativeColor={true}>
              <FaBoxOpen />
            </Button>
            <Button text='Contactar'>
              <FiMail />
            </Button>
          </div>
        </div>
        <Image src={headerImg} alt='header image' width={1200} height={600} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle='¡Agenda con nosotros!' content='Si quieres escoger un día ideal donde quieras tener una reunión con nosotros, revisa nuestro calendario para visualizar la disponibilidad que tenemos y darte el mejor servicio que mereces. ' />
        <div className={styles.calendar}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            aspectRatio={1}
          />
        </div>
      </Section>
      <Section reverse={true}>
        <Article subtitle='Te mantendremos siempre al tanto' content='Sabemos que a veces no tenemos tiempo de estar al tanto de las cosas, pero no te preocupes, haremos esa labor para ti. Inscríbete en nuestro boletín informativo para que seas siempre el primero en recibir todas nuestras novedades, noticias, productos y servicios.' />
        <div className={styles.listContactCards}>
          <ContactCard description='+897287298724' Icon={FaWhatsapp} color={'#659E43'}/>
          <ContactCard description='+897287298724' Icon={FaFacebookMessenger} color={'#225FE7'} />
          <ContactCard description='+897287298724' Icon={FaInstagram} color={'#FB8501'} />
          <ContactCard description='+897287298724' Icon={FaLinkedin} color={'#F0C712'} />
        </div>
      </Section>
      <Section vertical={true}>
        <ContactForm/>
      </Section>
    </main>
  )
}

export default Contact