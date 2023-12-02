import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/services_banner.png'
import meetImg from '@/app/img/Recurso 24 1.png'
import placesImg from '@/app/img/places.jpg'
import calendarImg from '@/app/img/calendar.jpg'
import houseImg from '@/app/img/Recurso 24 2.png'
import planBasic from '@/app/img/plan_basic.jpg'
import planNormal from '@/app/img/plan_normal.jpg'
import planPremium from '@/app/img/plan_premium.jpg'
import imagen1 from '@/app/img/Image 1.png'
import imagen2 from '@/app/img/Image 2.png'
import imagen3 from '@/app/img/Image 3.png'
import imagen4 from '@/app/img/Image 4.png'
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
      img: imagen1,
      description:'Organización de recogida en el aeropuerto.'
    },
    {
      img: imagen2,
      description: 'VISAS: Oferta estándar (sin incluir tasa de visa-apostilla + correo postal).'

    },
    {
      img: imagen3,
      description: 'Enseñanza de idiomas, Limpieza de la casa, Pintura de casas/pisos, Servicios de mantenimiento, Transporte de mascotas.'

    },
    {
      img: imagen4,
      description: 'Asistencia de soporte después de la mudanza (1 mes).'

    },
  ]
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}
          
        </div>
        <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <Section>
        <Article subtitle='El idioma no será un problema' content='En libling contarás con todas las herramientas para aprender un nuevo idioma sin problema,  ya que contamos con atención especial para los hispanohablantes y en tan sólo cuestión de tiempo podrás hablarlo perfectamente. Desde tu llegada al aeropuerto te daremos un tour por las calles de Luxemburgo, brindándote toda la información cultural que necesitas para que tu adaptación sea la más cómoda posible.' />
        <Image src={meetImg} id='travel-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section vertical={true} subtitle='Paquetes para todos'>
        <div className={styles.listCard}>
          <Card subtitle='$34' title='Básico' content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, dolores necessitatibus architecto ullam provident?' image={planBasic} actionText='Solicitar' actionUrl='solicitud' />
          <Card subtitle='$50' title='Estándar' content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, dolores necessitatibus architecto ullam provident?' image={planNormal} actionText='Solicitar' actionUrl='solicitud' />
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
            listaBeneficios.map((el, index) => (<MiniCard key={index} alt={`minicard${index}`} description={el?.description} img={el?.img} />))
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