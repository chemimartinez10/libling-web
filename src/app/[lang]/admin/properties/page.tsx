'use client'
import React from 'react'
import styles from './page.module.css'
import globalStyles from '@/app/globals.module.css'
import { dict } from '@/app/utils'
import { IPage } from '../layout'
import { FiHome } from 'react-icons/fi'
import { poppinsMedium } from '@/app/fonts'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/admin/button'

const Properties: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.adminProperties
  const glosaryNav = dict[lang]?.adminNav
  const router = useRouter()
  const goToCreate = ()=>{
    router.push('/admin/properties/create')
  }
  const properties = []
  return (<>
    <div className={styles.titleBar}>
      <h1 className={styles.titleBarTitle} style={poppinsMedium.style}>{glosaryNav.propertiesTitle}</h1>
      <div className={styles.breadcrumsContainer}>
        <Link href={'/admin/dashboard'}>
          <span className={styles.breadcrumsLink}>{glosaryNav.dashboardTitle}</span>
        </Link>
        <span className={styles.breadcrumsText}>/</span>
        <span className={styles.breadcrumsText}>{glosaryNav.propertiesTitle}</span>
      </div>
    </div>
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.indexTitle}</h2>
        <article className={styles.cardContent}>
          {
            properties?.length <= 0
              ?
              <div className={styles.emptyContainer}>
                <FiHome className={styles.emptyIcon} />
                <div className={styles.emptyText}>
                  <span className={styles.emptyTitle} style={poppinsMedium.style}>{glosary.indexEmptyListTitle}</span>
                  <span className={styles.emptyDescription}>{glosary.indexEmptyListDescription}</span>
                </div>
                <Button title={glosary.formButtonRegister} onClick={goToCreate} type='main'/>
              </div>
              :
              <div></div>
          }
        </article>
      </div>

    </section>
  </>
  )
}

export default Properties