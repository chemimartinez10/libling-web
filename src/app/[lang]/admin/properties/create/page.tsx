'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { dict } from '@/app/utils'
import { IPage } from '../../layout'
import { poppinsMedium } from '@/app/fonts'
import { useRouter } from 'next/navigation'

const PropertyCreate: React.FC<IPage> = ({ params: { lang } }) => {
    const glosary = dict[lang]?.adminProperties
    const [currentStep, setCurrentStep] = useState<number>(1)
    const finalStep = 5
    const arraySteps = new Array(finalStep).fill(0)
    console.log(arraySteps)
    const router = useRouter()
    const goToCreate = () => {
        router.push('/admin/properties/create')
    }
    return (<>
        <div className={styles.titleBar}>
            <div className={styles.stepContainer}>
                <span className={styles.stepText}>{glosary.formStep}{" "}{currentStep}{" "}{glosary.formStepConnector}{" "}{finalStep}</span>
                <div className={styles.indicatorContainer}>
                    {
                        arraySteps.map((el, index) => (
                            <div key={index} className={index <= currentStep - 1 ? styles.indicatorFill : styles.indicator}></div>
                        ))
                    }
                </div>
            </div>
            <span className={styles.buttonLink}>
                {glosary.formOptionCancel}
            </span>
        </div>
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.cardTitle} style={poppinsMedium.style}>{glosary.formStepTitle_1}</h2>
                <article className={styles.cardContent}>
                </article>
            </div>

        </section>
    </>
    )
}

export default PropertyCreate