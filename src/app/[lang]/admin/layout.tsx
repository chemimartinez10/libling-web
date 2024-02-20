
import type { Metadata } from 'next'
import '../../globals.css'

import 'react-toastify/dist/ReactToastify.css';
import { Body } from '@/app/components/admin/body';



export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Landing page for Libling solutions',
}
export interface IPage {
  params: {
    lang: "es" | "en" | "fr"
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
      <Body lang={lang}>
        {children}
      </Body>
    </html>
  )
}
