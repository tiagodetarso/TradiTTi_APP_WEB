import React, { useState } from 'react'

import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function DeliveryGap({ handleSubmit, btnText }) {

    const [ delivery, setDelivery ] = useState({underLimit:null, upperLimit:null})

    const submit = (e) => {
        e.preventDefault()
        const gap = `${delivery.underLimit} a ${delivery.upperLimit} minutos`
        handleSubmit(gap)
    }

    const handleChange = (e) => {
        setDelivery({ ...delivery, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="number"
                text="Limite Inferior"
                name="underLimit"
                placeholder="Ex: 20"
                handleOnChange={handleChange}
                value={delivery.underLimit}
            />
            <Input 
                type="number"
                text="Limite Superior"
                name="upperLimit"
                placeholder="Ex: 40"
                handleOnChange={handleChange}
                value={delivery.upperLimit}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}