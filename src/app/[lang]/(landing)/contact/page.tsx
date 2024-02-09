import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.gif'
import familyImg from '@/app/img/CEO_contact.jpg'
import Article from '@/app/components/article'
import { RiWhatsappLine, RiInstagramLine, RiMessengerLine, RiLinkedinFill } from "react-icons/ri";
import Section from '@/app/components/section'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'
import { dict } from '@/app/utils'
import { Calendar } from 'react-calendar'
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import { CalendarEvent } from './calendar'
import ical from 'ical'

interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
interface ICalEvent {
  type: string
  params: any[]
  start: Date
  end: Date
  dtstamp: Date
  uid: string
  created: Date
  lastmodified: Date
  sequence: string
  status: string
  summary: string
  transparency: string
}
interface IEvent {
  kind: string,
  etag: string,
  id: string,
  status: string,
  htmlLink: string,
  created: string,
  updated: string,
  summary: string,
  creator: { email: string, self: boolean },
  organizer: { email: string, self: boolean },
  start: {
    dateTime?: string,
    date: string,
    timeZone: string
  },
  end: {
    dateTime?: string,
    date: string,
    timeZone: string
  },
  iCalUID: string,
  sequence: number,
  reminders: { useDefault: boolean },
  eventType: string
}


const getEvents = async () => {
  let items: ICalEvent[] | [] = await new Promise((resolve, reject) => {
    ical.fromURL('https://calendar.google.com/calendar/ical/liblinglc%40gmail.com/public/basic.ics', {}, (err: any, data: any) => {
      if (err) {
        reject([])
      }
      resolve(Object.values(data))
    })
  })
  console.log(items)
  return items

}
const Contact: React.FC<IPage> = async ({ params: { lang } }) => {
  const glosary = dict[lang]?.contact
  const events: ICalEvent[] | [] = await getEvents() || []
  console.log(events?.length)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          {/* logotipo de libling */}

        </div>
        {
          // (width && width < 600)
          //   ?
          //   <Image src={headerImg} alt='header image' width={1500} height={500} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
          //   :
          <video autoPlay muted={true} loop style={{ width: '1500px', height: '500px', objectFit: 'cover', objectPosition: 'center center' }}>
            <source src={"/en/videos/contact_video.webm"} type="video/webm" />
            <source src={"/en/videos/contact_video.mp4"} type="video/mp4" />
          </video>
        }
      </header>
      <Section>
        <Article subtitle={glosary.sectionTitle_1} content={glosary.sectionContent_1} image={familyImg} />
        <CalendarEvent calendarTitle={glosary.calendarTitle} events={events} lang={lang} />
      </Section>
      <Section title={glosary.sectionTitle_2} resume={glosary.sectionContent_2}>
        <div className={styles.listContactCards}>
          <ContactCard description='+352691367757' url={`https://api.whatsapp.com/send?phone=${352691367757}`} Icon={RiWhatsappLine} color={'#659E43'} />
          <ContactCard description='+352691367757' url='https://m.me/61554771181200' Icon={RiMessengerLine} color={'#225FE7'} />
          <ContactCard description='+352691367757' url='https://www.instagram.com/libling_solutions' Icon={RiInstagramLine} color={'#FB8501'} />
          <ContactCard description='+352691367757' url='https://www.linkedin.com/company/libling/' Icon={RiLinkedinFill} color={'#F0C712'} />
        </div>
      </Section>
      <Section vertical={true}>
        <ContactForm lang={lang} />
      </Section>
    </main>
  )
}

export default Contact