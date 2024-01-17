import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import headerImg from '@/app/img/contact_banner.gif'
import familyImg from '@/app/img/big_family.png'
import Article from '@/app/components/article'
import { RiWhatsappLine, RiInstagramLine, RiMessengerLine, RiLinkedinFill } from "react-icons/ri";
import Section from '@/app/components/section'
import ContactForm from '@/app/components/form'
import ContactCard from '@/app/components/contactCard'
import { dict } from '@/app/utils'
import { Calendar } from 'react-calendar'
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import { CalendarEvent } from './calendar'

interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
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
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_secret: process.env.CALENDAR_OAUTH_SECRET || '',
    refresh_token: process.env.CALENDAR_REFRESH_TOKEN || '',
    client_id: process.env.CALENDAR_OAUTH_CLIENT_ID || '',
  })
  let items = []
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-cache",
    })
    const accessToken = await tokenResponse.json()
    console.log('datos de los token', accessToken)
    const eventsResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      cache: "no-cache",
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        "Content-Type": "application/json",
      }
    })
    const eventsData = await eventsResponse.json()
    console.log('datos de los eventos', eventsData.items)
    items = eventsData.items
  } catch (err) {
    console.log('ha ocurrido un error', err)
  }
  return items
}
const Contact: React.FC<IPage> = async ({ params: { lang } }) => {
  const glosary = dict[lang]?.contact
  const events: IEvent[] | [] = await getEvents()
  console.log(events.length)

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
        <CalendarEvent calendarTitle={glosary.calendarTitle} events={events} lang={lang}/>
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