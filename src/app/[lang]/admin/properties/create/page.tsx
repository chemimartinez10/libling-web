'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './page.module.css'
import { dict } from '@/app/utils'
import { IPage } from '../../layout'
import { useRouter } from 'next/navigation'

import { ISelectElement } from '@/app/interfaces'
import { createPropertyType, getPropertyTypes } from '@/services'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import StepFour from './stepFour'
import StepFive from './stepFive'
import useStore from '@/app/hooks/useStore'
import { usePropertyStore } from '@/app/hooks/usePropertyStore'


const PropertyCreate: React.FC<IPage> = ({ params: { lang } }) => {
    const store = useStore(usePropertyStore, (state) => state)
    const step = store?.lastStep
    const glosary = dict[lang]?.adminProperties
    const finalStep = 5
    const arraySteps = new Array(finalStep).fill(0)
    const router = useRouter()
    const handleNext = () => {
        if (!!step && step < 5) {
            store?.addStep()
        }
    }
    const handleBack = () => {
        if (!!step && step > 1) {
            store?.removeStep()
        }
    }
    const handleSubmit = () => {

    }

    const goToCreate = () => {
        router.push('/admin/properties/create')
    }


    return (<>
        <div className={styles.titleBar}>
            <div className={styles.stepContainer}>
                <span className={styles.stepText}>{glosary.formStep}{" "}{step}{" "}{glosary.formStepConnector}{" "}{finalStep}</span>
                <div className={styles.indicatorContainer}>
                    {
                        arraySteps.map((el, index) => (
                            <div key={index} className={!!step && index <= step - 1 ? styles.indicatorFill : styles.indicator}></div>
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
                step === 1
                &&
                <StepOne params={{ lang }} onNext={handleNext} />
            }
            {
                step === 2
                &&
                <StepTwo params={{ lang }} onNext={handleNext} onBack={handleBack} />
            }
            {
                step === 3
                &&
                <StepThree params={{ lang }} onNext={handleNext} onBack={handleBack} />
            }
            {
                step === 4
                &&
                <StepFour params={{ lang }} onNext={handleNext} onBack={handleBack} />
            }
            {
                step === 5
                &&
                <StepFive params={{ lang }} onNext={handleSubmit} onBack={handleBack} />
            }
        </section>
    </>
    )
}

export default PropertyCreate