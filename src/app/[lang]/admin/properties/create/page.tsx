'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { dict } from '@/app/utils'
import { IPage } from '../../layout'
import { useRouter } from 'next/navigation'

import { ISelectElement } from '@/app/interfaces'
import { createPropertyType, getPropertyTypes } from '@/services'
import StepOne from './stepOne'
import StepTwo from './stepTwo'


const PropertyCreate: React.FC<IPage> = ({ params: { lang } }) => {
    const glosary = dict[lang]?.adminProperties
    const [currentStep, setCurrentStep] = useState<number>(1)
    const finalStep = 5
    const arraySteps = new Array(finalStep).fill(0)
    const router = useRouter()
    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(state => state + 1)
        }
    }
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(state => state - 1)
        }
    }



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
            <span className={styles.buttonLink} onClick={() => { router.replace('/admin/properties') }}>
                {glosary.formOptionCancel}
            </span>
        </div>
        <section className={styles.section}>
            {
                currentStep === 1
                &&
                <StepOne params={{ lang }} onNext={handleNext} />
            }
            {
                currentStep === 2
                &&
                <StepTwo params={{ lang }} onNext={handleNext} onBack={handleBack} />
            }
        </section>
    </>
    )
}

export default PropertyCreate