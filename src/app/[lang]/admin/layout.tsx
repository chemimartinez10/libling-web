import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '../../components/admin/navbar'
import { poppinsRegular } from '../../fonts'
import styles from '@/app/[lang]/(landing)/page.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Landing page for Libling solutions',
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
        <Navbar lang={lang} />
        {children}
      </body>
    </html>
  )
}
