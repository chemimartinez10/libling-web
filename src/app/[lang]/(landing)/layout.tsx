import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '../../components/navbar'
import { poppinsRegular } from '../../fonts'
import Footer from '@/app/components/footer'
import styles from '@/app/[lang]/(landing)/page.module.css'
import Menu from '@/app/components/menu'


export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Landing page for Libling solutions',
}

export default function RootLandingLayout({
  children,
  lang
}: {
  children: React.ReactNode,
    lang: "es" | "en" | "fr"
}) {
  console.log('aqui', lang)
  return (
    <html lang="en">
      <body style={poppinsRegular.style} className={styles.layout}>
        <Menu/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
