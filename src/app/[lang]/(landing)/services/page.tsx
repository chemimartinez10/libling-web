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
        <Article subtitle='Déjalo en nuestras manos' content='Te ofrecemos orientacion profesional acerca de todo el proceso de inmigración hacia tu nuevo pais, desde la solicitud de permisos de trabajo hasta la solicitud de residencia. Además tenemos asistencia en tramites administrativos.' Icon={FaPenFancy} />
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
        <Article subtitle='Vive nuevas experiencias' content='Conoce luxemburgo de mano de nuestros tours de hasta 1 día de duración, así como te ayudamos a conseguir las mejores alternativas en alojamiento ' Icon={FaUmbrellaBeach} />
        <Image src={placesImg} id='places-img' width={600} height={600} style={{ borderRadius: 24 }} alt='travel' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 400px, 600px' layout="responsive" />
      </Section>
      <Section>
        <Article subtitle='Que el proceso sea lo más simple' content='Buscar una vivienda es mas simple con nuestro servicio de asistencia a la hora de buscar esa casa que estabas esperando, como también esa escuela o institucion de aprendizaje que te permita desarrollar aun mas tus habilidades.' Icon={FaMagnifyingGlass} />
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
        <Article subtitle={'Apunta tu cita'} content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, eaque quisquam doloremque molestias velit quas minima. Harum at obcaecati porro.' buttonText='Agendar'  />
        <Image src={calendarImg} width={400} height={400} style={{ borderRadius: 24 }} alt='work' sizes='(max-width: 768px) 100vw, (max-width: 1120px) 350px, 400px' layout="responsive" />
      </Section>
    </main>
  )
}

export default Services