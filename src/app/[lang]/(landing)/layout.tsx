import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '../../components/navbar'
import { poppinsRegular } from '../../fonts'
import Footer from '@/app/components/footer'


export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Landing page for Libling solutions',
}

export default function RootLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppinsRegular.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
