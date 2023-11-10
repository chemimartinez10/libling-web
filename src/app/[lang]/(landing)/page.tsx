import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/header_2.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import { FiCalendar, FiMail } from 'react-icons/fi'
import Button from '@/app/components/button'
import AnimatedText from '@/app/components/animatedText'
import Article from '@/app/components/article'
import { FaPeopleCarryBox } from "react-icons/fa6";
interface IPage {
  params: {
    lang: string
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}
          <h1 className={poppinsSemiBold.className}>Libling</h1>
          <AnimatedText />
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt hic tempore eum optio dicta quis veritatis eius laborum neque eos?</h4>
          <div className={styles.buttonContainer}>
            <Button text='Agendar' alternativeColor={true}>
              <FiCalendar />
            </Button>
            <Button text='Contactar'>
              <FiMail />
            </Button>
          </div>
        </div>
        <Image src={headerImg} alt='header image' width={1200} height={600} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
      </header>
      <section>
        <Article subtitle='Estamos a tu lado para ayudarte en lo que necesites' content='Te brindaremos apoyo durante tu proceso de adaptación facilitándote toda la información que necesitas  para que puedas vivir una vida de calidad en Luxemburgo.
' Icon={FaPeopleCarryBox} />
        <Article subtitle='Estamos a tu lado para ayudarte en lo que necesites' content='Te brindaremos apoyo durante tu proceso de adaptación facilitándote toda la información que necesitas  para que puedas vivir una vida de calidad en Luxemburgo.
' Icon={FaPeopleCarryBox} />
        
      </section>
      <section>
        <article></article>
      </section>
      <section>
        <article></article>
        <article></article>
        <article></article>
      </section>
    </main>
  )
}

export default Home