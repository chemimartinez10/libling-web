import type { Metadata } from 'next'
import '../../globals.css'
import { poppinsRegular } from '../../fonts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './layout.module.css'
import { CountrySelector } from '@/app/components/countrySelector';




export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'login for Libling solutions admin',
}

export default function RootLandingLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode,
  params: { lang: "es" | "en" | "fr" }

}) {
  return (
    <html lang={lang}>
      <body style={poppinsRegular.style} className={styles.layout}>
        <ToastContainer />
        <div className={styles.floatSelector}>
          <CountrySelector lang={lang} />
        </div>
        {children}
      </body>
    </html>
  )
}
