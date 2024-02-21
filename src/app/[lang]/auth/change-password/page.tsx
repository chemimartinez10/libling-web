'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { dict } from '@/app/utils';
import CustomToast from '@/app/components/toast';
import { toast } from 'react-toastify';

interface IValues {
    password: string
    passwordConfirmation: string
}

const ChangePassword = ({ params }: { params: { lang: "es" | "en" | "fr" } }) => {
    const lang = params.lang
    const glosary = dict[lang]?.auth
    const validationSchema = Yup.object({
        password: Yup.string().required(glosary.login_password_required),
        passwordConfirmation: Yup.string().nonNullable()
            .oneOf([Yup.ref('password')], glosary.login_password_confirmation_required)
    });
    const handleSubmit = (values: IValues, { setSubmitting }: FormikHelpers<IValues>) => {
        toast.error(<CustomToast type='error' title='Error' content={glosary.error_default} />, { theme: 'colored', icon: false, style: { backgroundColor: '#FF4444', maxWidth: 450, padding: 24, borderRadius: 10 } })
        setSubmitting(false)
    }

    return (
        <div>
            <h1>Any place in your app!</h1>
            <Formik
                initialValues={{ password: '', passwordConfirmation: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ChangePassword;