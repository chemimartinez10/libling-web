import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '../../components/navbar'
import { poppinsRegular } from '../../fonts'
import Footer from '@/app/components/footer'
import styles from '@/app/[lang]/(landing)/page.module.css'
import Menu from '@/app/components/menu'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script'




export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Travel to Luxemburg, providing you with comprehensive service and optimal support in your relocation process to Luxembourg. We are by your side to assist you with whatever you need',
  robots: 'index, follow',
  keywords: ['relocation', 'relocation help', 'experiences on Luxemburg', 'Luxemburg country', 'Libling', 'assist to relocation', 'support to your relocation', 'multilanguages relocation page', 'secure relocation to Luxembourg', 'easy relocation', 'real state on luxemburg', 'travel to luxemburg', 'Best option to relocate to Luxemburg', "Relocación","Ayuda para la reubicación","Experiencias en Luxemburgo","Luxemburgo (país)","Asistencia para la reubicación","Apoyo para tu reubicación","Página de reubicación multilingüe","Mudanza segura a Luxemburgo","Mudanza fácil","Bienes raíces en Luxemburgo","Viajar a Luxemburgo","La mejor opción para reubicarse en Luxemburgo","Latinos en Luxemburgo"],
  alternates:
  {
    canonical: "https://libling.lu",
    languages: {
      en: "https://libling.lu/en",
      es: "https://libling.lu/es",
      fr: "https://libling.lu/fr",
    }
  }
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
      <Script
        id="google-analytics-call"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        strategy="afterInteractive">
      </Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', '${process.env.GOOGLE_ANALYTICS}');`
        }
      </Script>
      <body style={poppinsRegular.style} className={styles.layout}>
        <ToastContainer />
        <Menu lang={lang} />
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  )
}
