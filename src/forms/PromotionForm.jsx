import React, { useState, useEffect } from 'react'

import Input from '../formItens/Input'
import Select from '../formItens/Select'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function PromotionForm({ handleSubmit, btnText, initialData }) {

    const weekDayNumber = {
        'Nenhum dia específico': 7,
        'Domingo':0,
        'Segunda-feira':1,
        'Terça-feira':2,
        'Quarta-feira':3,
        'Quinta-feira':4,
        'Sexta-feira':5,
        'Sábado':6
    }

    const numberDayWeek = {
        7:'Nenhum dia específico',
        0:':Domingo',
        1:'Segunda-feira',
        2:'Terça-feira',
        3:'Quarta-feira',
        4:'Quinta-feira',
        5:'Sexta-feira',
        6:'Sábado'
    }

    const [ promotion, setPromotion ] = useState(initialData)

    console.log(promotion)

    const submit = (e) => {
        e.preventDefault()
        handleSubmit({
            id: initialData._id,
            promotionValue: Number(promotion.promotionValue),
            fixPromotionDay: weekDayNumber[promotion.fixPromotionDay],
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
                    'Nenhum dia específico',
                    'Domingo',
                    'Segunda-feira',
                    'Terça-feira',
                    'Quarta-feira',
                    'Quinta-feira',
                    'Sexta-feira',
                    'Sábado'
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