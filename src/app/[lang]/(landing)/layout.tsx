import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '../../components/navbar'
import { poppinsRegular } from '../../fonts'
import Footer from '@/app/components/footer'
import styles from '@/app/[lang]/(landing)/page.module.css'
import Menu from '@/app/components/menu'
import { useParams } from 'next/navigation'


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
        <Menu lang={lang} />
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  )
}
