'use client'
import React from 'react'
import styles from './page.module.css'
import globalStyles from '@/app/globals.module.css'
import HighlightIMG1 from '@/app/img/Ellipse1.jpg'
import HighlightIMG2 from '@/app/img/Ellipse2.jpg'
import HighlightIMG3 from '@/app/img/Ellipse3.jpg'
import HighlightIMG4 from '@/app/img/Ellipse4.jpg'
import { poppinsBold, poppinsRegular, poppinsSemiBold } from '@/app/fonts'
import Article from '@/app/components/article'
import Section from '@/app/components/section'
import Highlight from '@/app/components/highlight'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import HeaderHome from '@/app/components/headerHome'
import PartnerSlider from '@/app/components/partnerSlider'
import AnimatedImage from '@/app/components/animatedImage'
import AsesoramientoIMG from '@/app/img/asesoramiento.jpeg'
import ConoceIMG from '@/app/img/conoce.png'
import AyudaIMG from '@/app/img/ayuda.jpeg'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.home
  const { height, width } = useWindowDimensions();

  const listaBeneficios = [
    {
      title: glosary.sectionList_3[0],
      img: HighlightIMG1
    },
    {
      title: glosary.sectionList_3[1],
      img: HighlightIMG2
    },
    {
      title: glosary.sectionList_3[2],
      img: HighlightIMG3
    },
    {
      title: glosary.sectionList_3[3],
      img: HighlightIMG4
    },
  ]
  return (
    <main className={styles.main}>

      <HeaderHome lang={lang}/>
      {/* <header className={styles.header}>
        <div className={styles.headerMask}>
          <div className={styles.textContainer}>
            <h1>
              <span className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_1}</span>
              <span>{' '}</span>
              <span className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_2}</span>
              <span>{' '}</span>
              <span className={styles.headerTitle} style={poppinsBold.style}>{glosary.titleHeader_3}</span>
            </h1>
          </div>
        </div>
        {
          (width && width < 600)
            ?
            <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
            :
            <video autoPlay muted={true} loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}>
              <source src={"/en/videos/home_video.webm"} type="video/webm" />
              <source src={"/en/videos/home_video.mp4"} type="video/mp4" />
            </video>
        }
        
      </header> */}
      <Section backgroundColor='#fff' vertical={true}>
        <h4 className={[globalStyles.miniTitle, globalStyles.textPrimary].join(' ')} style={poppinsSemiBold.style}>{glosary.sectionPartners}</h4>
        <PartnerSlider/>
      </Section>
      <Section backgroundColor='#EDF0F4'>
        <Article title={glosary.sectionMiniTitle_1} subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} buttonText={glosary.sectionButton_1} buttonAction='/contact' />
        <AnimatedImage image={AyudaIMG} alt={glosary.sectionTitle_1}/>
      </Section>
      <Section reverse={true} backgroundColor='#EDF0F4'>
        <Article title={glosary.sectionMiniTitle_2} subtitle={glosary.sectionTitle_2} content={glosary.sectionContent_2} buttonText={glosary.sectionButton_2} buttonAction='/services' />
        <AnimatedImage image={ConoceIMG} alt={glosary.sectionTitle_2} reverse={true}/>
      </Section>
      <Section vertical={true} subtitle={glosary.sectionTitle_3} backgroundColor={'#fff'}>
        <div className={styles.listHighlights}>
          {
            listaBeneficios.map((el, index) => (<Highlight key={index} title={el?.title} alt={`highlight${index}`} img={el?.img} description={el?.title} />))
          }
        </div>

      </Section>
      <Section backgroundColor='#EDF0F4'>
        <Article title={glosary.sectionMiniTitle_3} subtitle={glosary.sectionTitle_4} list={glosary.sectionList_4} buttonText={glosary.sectionButton_2} buttonAction='/services'/>
        <AnimatedImage image={AsesoramientoIMG} alt={glosary.sectionTitle_3}/>


      </Section>
      {/* <Section>
        <div className={styles.listReview}>
          <Review title={glosary.reviewName_1} img={Testigo1} description={glosary.reviewDescription_1} />
          <Review title={glosary.reviewName_2} img={Testigo2} description={glosary.reviewDescription_2} />
          <Review title={glosary.reviewName_3} img={Testigo3} description={glosary.reviewDescription_3} />
        </div>
      </Section> */}
    </main>
  )
}

export default Home