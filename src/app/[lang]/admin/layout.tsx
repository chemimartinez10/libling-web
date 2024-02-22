
import type { Metadata } from 'next'
import '../../globals.css'

import 'react-toastify/dist/ReactToastify.css';
import { Body } from '@/app/components/admin/body';
import { auth } from '@/auth';



export const metadata: Metadata = {
  title: 'Libling Solutions',
  description: 'Landing page for Libling solutions',
}
export interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}

export default async function RootLandingLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode,
  params: { lang: "es" | "en" | "fr" }
  
}) {
  const session = await auth()
  return (
    <html lang={lang}>
      <Body lang={lang} user={session?.user}>
        {children}
      </Body>
    </html>
  )
}
