import React, { useState, useEffect } from 'react'

import Input from '../formItens/Input'
import Select from '../formItens/Select'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function PromotionForm({ handleSubmit, btnText, initialData }) {

    const [ promotion, setPromotion ] = useState(initialData)

    console.log(promotion)

    const submit = (e) => {
        e.preventDefault()
        handleSubmit({
            id: initialData._id,
            promotionValue: Number(promotion.promotionValue),
            fixPromotionDay: promotion.fixPromotionDay,
            promotionInitialDate: new Date(String(promotion.promotionInitialDate)),
            promotionFinalDate: new Date(String(promotion.promotionFinalDate))
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setPromotion({ ...promotion, [e.target.name]: e.target.value})
        console.log(promotion)
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="number"
                text="Valor Promocional R$"
                step={.01}
                name="promotionValue"
                placeholder="Preencha com o valor promocional"
                handleOnChange={handleChange}
                value={promotion.promotionValue}
            />
            <Select
                text="Dia Fixo Promocional"
                name="fixPromotionDay"
                size='1'
                handleOnChange={handleChange}
                ops={[
                    {name:'Nenhum dia específico', value:7},
                    {name:'Domingo', value: 0},
                    {name:'Segunda-feira', value: 1},
                    {name:'Terça-feira', value: 2},
                    {name:'Quarta-feira', value: 3},
                    {name:'Quinta-feira', value: 4},
                    {name:'Sexta-feira', value: 5},
                    {name:'Sábado', value: 6}
                ]}
            />
            <Input 
                type="date"
                text="Início da promoção"
                name="promotionInitialDate"
                handleOnChange={handleChange}
                value={promotion.promotionInitialDate}
            />
            <Input 
                type="date"
                text="Término da promoção"
                name="promotionFinalDate"
                handleOnChange={handleChange}
                value={promotion.promotionFinalDate}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}