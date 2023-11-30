import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/migrate.jpg'
import meetImg from '@/app/img/meet.jpg'
import placesImg from '@/app/img/places.jpg'
import calendarImg from '@/app/img/calendar.jpg'
import houseImg from '@/app/img/house.jpg'
import planBasic from '@/app/img/plan_basic.jpg'
import planNormal from '@/app/img/plan_normal.jpg'
import planPremium from '@/app/img/plan_premium.jpg'
import locationImg from '@/app/img/location.jpg'
import timeImg from '@/app/img/time.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaUmbrellaBeach, FaMagnifyingGlass, FaPenFancy, FaVanShuttle, FaVideo, FaNewspaper, FaMapLocationDot, FaHourglassHalf, FaBoxOpen } from "react-icons/fa6";
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import Card from '@/app/components/card'
import MiniCard from '@/app/components/miniCard'
interface IPage {
  params: {
    lang: string
  }
}
const Services: React.FC<IPage> = ({ params: { lang } }) => {
  const listaBeneficios = [
    {
      title: 'Lorem, ipsum.',
      img: locationImg,
      description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo veritatis quia qui iste laudantium.'
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
        <Article subtitle='El idioma no será un problema' content='En libling contarás con todas las herramientas para aprender un nuevo idioma sin problema,  ya que contamos con atención especial para los hispanohablantes y en tan sólo cuestión de tiempo podrás hablarlo perfectamente. Desde tu llegada al aeropuerto te daremos un tour por las calles de Luxemburgo, brindándote toda la información cultural que necesitas para que tu adaptación sea la más cómoda posible.' />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section vertical={true}>
        <Article subtitle='Planes para todos' />
        <div className={styles.listCard}>
          <Card subtitle='$34' title='Básico' content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, dolores necessitatibus architecto ullam provident?' image={planBasic} actionText='Solicitar' actionUrl='solicitud' />
          <Card subtitle='$50' title='Estándar' content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, dolores necessitatibus architecto ullam provident?' big={true} image={planNormal} actionText='Solicitar' actionUrl='solicitud' />
          <Card subtitle='$63' title='Premium' content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, dolores necessitatibus architecto ullam provident?' image={planPremium} actionText='Solicitar' actionUrl='solicitud' />
        </div>

      </Section>
      <Section reverse={true}>
        <Article subtitle='Para los más pequeños' content='La educación de los pequeños es de gran importancia y Libling te ayudará a encontrar las escuelas o guarderías que sean de agrado para ti, para que tus pequeños puedan seguir estudiando y cumplir sus sueños.' />
        <Image src={placesImg} id='places-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle='Te ayudamos con tus trámites' content='Durante tu llegada a Luxemburgo te ayudaremos con tus trámites administrativos a ti y a tu familia. Esto incluye el registro y 4 servicios adicionales para que poco a poco todo vaya sobre la marcha. Durante tu mudanza, te acompañaremos en todos los procesos que necesites para que puedas disfrutar tu estadía permanente en  Luxemburgo, pero eso no es todo, ya que Libling te brindará asistencia de soporte gratuito durante 30 días.' />
        <Image src={houseImg} id='house-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>

      <Section vertical={true} subtitle='Tenemos más para ti'>
        <div className={styles.listServices}>
          {
            listaBeneficios.map((el, index) => (<MiniCard key={index} title={el?.title} alt={`minicard${index}`} description={el?.description} img={el?.img} />))
          }
        </div>

      </Section>
      <Section>
        <Article subtitle={'Apunta tu cita'} content='Si quieres escoger un día ideal donde quieras tener una reunión con nosotros, revisa nuestro calendario para visualizar la disponibilidad que tenemos y darte el mejor servicio que mereces.' buttonText='Agendar'  />
        <Image src={calendarImg} width={400} height={400} style={{ borderRadius: 24 }} alt='work' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 350px, 400px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services