"use client"
import React from 'react'
import './calendar.css';
import styles from './page.module.css'
import { poppinsMedium, poppinsRegular } from '@/app/fonts';
import Calendar from 'react-calendar';
import { useRouter } from 'next/navigation';

interface ICalendarEvents {
    calendarTitle: string
    lang: "es" | "en" | "fr"
    events: IEvent[] | []
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


export const CalendarEvent: React.FC<ICalendarEvents> = ({ calendarTitle, lang, events }) => {
    const router = useRouter()
    const setClickDate = (date: Date) => {
        let eventList = events.map(el => new Date(el.start.dateTime || el.start.date).toDateString())
        console.log(eventList)
        console.log(date.toDateString())
        if (!eventList.some(el => el === date.toDateString())){
            // router.push(`/home`)
            router.push(`/contact?date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}#contactForm`, { scroll: true })
        }
    }
    return (
        <div className={styles.calendar}>
            <h3 style={poppinsMedium.style}>{calendarTitle}</h3>
            <Calendar 
            locale={lang} 
            className={poppinsRegular.className} 
            onClickDay={setClickDate}
            tileClassName={({ date }) => {
                return events.some(
                    (event) => {
                        let dateStr = event.start.dateTime || event.start.date
                        return new Date(`${dateStr}${dateStr.length <= 8 ? 'T00:00:00+02:00' : ''}`).toDateString() === date.toDateString()
                    }
                )
                    ? "event-marked"
                    : ""

            }
            } />
        </div>
    )
}
