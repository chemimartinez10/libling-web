import type { Metadata } from 'next'
import '../../globals.css'
import { poppinsRegular } from '../../fonts'
import Footer from '@/app/components/footer'
import styles from '@/app/[lang]/(landing)/page.module.css'
import Menu from '@/app/components/menu'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script'
import NavbarImmo from '@/app/components/navbarImmo'
import ContactSection from '@/app/components/contactSection'
import FooterImmo from '@/app/components/footerImmo'




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
    <html lang={lang} style={{backgroundColor:'#FAFAFA', color:'#000000DE'}}>
      <body style={poppinsRegular.style} className={styles.layout}>
        <ToastContainer />
        <Menu lang={lang} />
        <NavbarImmo lang={lang} />
        {children}
        <ContactSection lang={lang}/>
        <FooterImmo lang={lang} />
      </body>
    </html>
  )
}
