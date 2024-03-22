import type { Metadata } from 'next'
import '../../globals.css'
import { poppinsRegular } from '../../fonts'
import styles from '@/app/[lang]/(landing)/page.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarImmo from '@/app/components/navbarImmo'
import ContactSection from '@/app/components/contactSection'
import FooterImmo from '@/app/components/footerImmo'
import { countryType } from '@/app/interfaces'
import { cookies } from 'next/headers'
import ContactForm from '@/app/components/contactForm'




export const metadata: Metadata = {
  title: 'Libling Immo',
  description: 'Get your new property with Libling Immo a solution to find a property, get a new life in luxemburg, and search for properties arround the world',
  robots: 'index, follow',
  keywords: ['Real state solution', 'immobilier Luxemburg', 'rent', 'sale', 'best houses on Luxemburg', 'libling', 'live in Luxemburg', 'immo', 'secure relocation to Luxembourg', 'easy relocation', 'real state on luxemburg', 'travel to luxemburg', 'commercial office at luxemburg', 'houses in europe', "Solución inmobiliaria", "Inmobiliaria Luxemburgo", "Alquiler", "Venta", "Las mejores casas en Luxemburgo", "Vivir en Luxemburgo", "Inmobiliaria", "Mudanza segura a Luxemburgo", "Mudanza fácil", "Bienes raíces en Luxemburgo", "Viajar a Luxemburgo", "Oficina comercial en Luxemburgo", "Casas en Europa",],
  alternates:
  {
    canonical: "https://libling.lu/immo",
    languages: {
      en: "https://libling.lu/en/immo",
      es: "https://libling.lu/es/immo",
      fr: "https://libling.lu/fr/immo",
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
  const country = cookies().get('immo-country')?.value as countryType || 'LU'
  return (
    <html lang={lang} style={{ backgroundColor: '#FAFAFA', color: '#000000DE' }}>
      <body style={poppinsRegular.style} className={styles.layout}>
        <ToastContainer />
        <NavbarImmo lang={lang} country={country} />
        {children}
        <ContactSection lang={lang} />
        <div className={styles.contactForm}>
          <ContactForm lang={lang} />
        </div>
        <FooterImmo lang={lang} />
      </body>
    </html>
  )
}
