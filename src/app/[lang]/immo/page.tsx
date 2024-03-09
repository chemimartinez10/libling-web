'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import bannerMedium from '@/app/img/immo/hero_landing_1440x900.jpg'
import bannerSmall from '@/app/img/immo/hero_landing_320x568.jpg'
import { poppinsMedium, poppinsSemiBold } from '@/app/fonts'
import { dict } from '@/app/utils'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import InputSwitch from '@/app/components/admin/inputSwitch'
import InputSelect from '@/app/components/admin/inputSelect'
import { ISelectElement } from '@/app/interfaces'
import { getPropertyTypes } from '@/services'
import { InputText } from '@/app/components/admin/inputText'
import { FiSearch } from 'react-icons/fi'
import PropertyCategory from '@/app/components/propertyCategory'
import { useRouter } from 'next/navigation'
interface IPage {
  params: {
    lang: "es" | "en" | "fr"
  }
}
const Home: React.FC<IPage> = ({ params: { lang } }) => {
  const glosary = dict[lang]?.immo
  const glosaryAdmin = dict[lang]?.adminProperties
  const mainColor = '#FFB34C'
  const textColor = '#000000DD'
  const [list, setList] = useState<ISelectElement[]>([])
  const [type, setType] = useState<string | number>(1)
  const [address, setAddress] = useState<string>('')
  const [propertyType, setPropertyType] = useState<string>('')
  const { height, width } = useWindowDimensions();
  const router = useRouter()
  const listSwitch = [
    {
      key: 1,
      value: glosaryAdmin.formLabelSale,
    },
    {
      key: 0,
      value: glosaryAdmin.formLabelRent,
    },
  ]
  const fetchPropertyTypes = async () => {
    const data = await getPropertyTypes()
    const newArray = data?.map(el => ({ key: el.id, value: el.name }))
    setList(newArray || [])
  }

  const handlePropertyType = (key: string) => {
    console.log('selected key', key)
    setPropertyType(key)
  }
  const handleSellType = (key: string | number) => {
    console.log('selected key', key)
    setType(key)
  }
  const handleAddress: ((e: string | React.ChangeEvent<any>) => void) | undefined = (e) => {
    if (typeof e !== 'string') {
      setAddress(e.target.value)
    }
  }
  const handleSubmit = () => {
    const urlQuery = new URLSearchParams('')
    urlQuery.append('type', type.toString())
    urlQuery.append('propertyType', propertyType.toString())
    urlQuery.append('address', address.toString())

    router.push(`/immo/search?${urlQuery.toString()}`)
  }

  useEffect(() => {
    fetchPropertyTypes()
  }, [])
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerMask}>
          <div className={styles.textContainer}>
            <h4 className={styles.headerTitle} style={poppinsSemiBold.style}>{glosary.headerTitle}</h4>
            <p className={styles.headerDescription}>{glosary.headerDescription}</p>
          </div>
          <div className={styles.formHeader}>
            <InputSwitch list={listSwitch} initialValue={1} onChange={handleSellType} label={glosaryAdmin.formLabelCategory} mainColor={mainColor} textColor={textColor} />
            <InputSelect label={glosaryAdmin.formLabelPropertyType} placeholder={glosaryAdmin.formPlaceholderSelect} list={list} onChange={handlePropertyType} lang={lang} />
            <InputText label={glosaryAdmin.formLabelAddress} placeholder='Ej.: 17, rue du Marché-aux-Herbes' value={address} onChange={handleAddress} />
            <button className={styles.headerButton} onClick={handleSubmit}>
              <FiSearch className={styles.headerButtonIcon} />
              <span className={styles.headerButtonText} style={poppinsMedium.style}>
                {glosary.headerButton}
              </span>
            </button>
          </div>
        </div>
        {
          (width && width < 500)
            ?
            <Image src={bannerSmall.src} alt='header image' width={320} height={568} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />
            :
            <Image src={bannerMedium.src} alt='header image' width={1440} height={450} priority={true} style={{ objectFit: 'cover', objectPosition: 'center center' }} />

        }

      </header>
      <section className={styles.propertiesSection}>
        <PropertyCategory title={glosary.sectionTitle_1} description={glosary.sectionDescription_1} lang={lang} />
        <PropertyCategory title={glosary.sectionTitle_2} description={glosary.sectionDescription_2} filters={{ active: true }} lang={lang} />
        <PropertyCategory title={glosary.sectionTitle_3} description={glosary.sectionDescription_3} filters={{ active: true }} lang={lang} />
        <PropertyCategory title={glosary.sectionTitle_4} description={glosary.sectionDescription_4} filters={{ active: true }} lang={lang} />
        <PropertyCategory title={glosary.sectionTitle_5} description={glosary.sectionDescription_5} filters={{ active: true }} lang={lang} />
      </section>
    </main>
  )
}

export default Home