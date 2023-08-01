import React, { useState } from 'react'

import Input from '../formItens/Input'
import Select from '../formItens/Select'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function DeliveryFee({ handleSubmit, btnText }) {

    const [ fee, setFee ] = useState({name: "", taxa:0})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(fee)
    }

    const handleChange = (e) => {
        setFee({ ...fee, [e.target.name]: e.target.value})
    }

    const neighborhood = [
        {name: "ESCOLHA"},
        {name: "NÃO MORO EM ASTORGA"},
        {name: "CENTRO"},
        {name: "CJ ALVORADA"},
        {name: "CJ ANTONIO LOURENÇO I"},
        {name: "CJ ANTONIO LOURENÇO II"},
        {name: "CJ HAB DIMAS DURAES"},
        {name: "CJ HAB VERELENA"},
        {name: "CJ SOL NASCENTE"},
        {name: "DISTR ICARA"},
        {name: "DISTR SANTA ZELIA"},
        {name: "DISTR TUPINAMBA"},
        {name: "GRALHA AZUL"},
        {name: "GRANADA"},
        {name: "GLEBA PATRIMONIO"},
        {name: "GLEBA RIBEIRÃO"},
        {name: "GLEBA PARANAGUÁ"},
        {name: "GLEBA PIMPINELA"},
        {name: "JD ALTO DA BOA VISTA"},
        {name: "JD ASTORGA"},
        {name: "JD BALNEARIO GUANABARA"},
        {name: "JD BELA VISTA"},
        {name: "JD BELUCO"},
        {name: "JD CENTRAL"},
        {name: "JD DAS TORRES I"},
        {name: "JD DAS TORRES II"},
        {name: "JD IMPERIAL"},
        {name: "JD ITALIA"},
        {name: "JD JACOMO VISCARDI"},
        {name: "JD LICCE I"},
        {name: "JD LICCE II"},
        {name: "JD LIOGI CAVALARI"},
        {name: "JD LONDRINA"},
        {name: "JD NOVA VENEZA"},
        {name: "JD PANORAMA I"},
        {name: "JD PARANORAMA II"},
        {name: "JD PARANA I"},
        {name: "JD PARANA II"},
        {name: "JD PLANALTO"},
        {name: "JD SAO BENEDITO"},
        {name: "JD SAO JOSE"},
        {name: "JD SAO PAULO"},
        {name: "JD SINUELO"},
        {name: "JD TAQUARI"},
        {name: "JD VITORIA REGIA"},
        {name: "JOAO JULIANI"},
        {name: "PQ INDUSTR RECIERI RESQUETI"},
        {name: "PQ INDUSTR ADELINO SALVADOR"},
        {name: "RES TIMBO"},
        {name: "VL APARECIDA"},
        {name: "VL BANDEIRANTES"},
        {name: "VL BRASIL"},
        {name: "VL EDMEIA"},
        {name: "VL EDMUNDO ROTHER"},
        {name: "VL FRANCISCO SILVA"},
        {name: "VL IMAGUIRI"},
        {name: "VL INDUSTRIAL"},
        {name: "VL IVO MENDES"},
        {name: "VL MOREIRA"},
        {name: "VL NOVA"},
        {name: "VL NOVA AMERICA"},
        {name: "VL OLIVIA"},
        {name: "VL PAULISTA"},
        {name: "VL RIOS"},
        {name: "VL SAMUEL"},
        {name: "VL TREVISAN"},
        {name: "VL ZANIN"}
    ]

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Taxa de ENTREGA"
                name="taxa"
                placeholder="Ex: 5"
                handleOnChange={handleChange}
                value={fee.taxa}
            />
            <Select
                name="neighborhood"
                ops={neighborhood}
                text="Bairro ou Distrito"
                size={1}
                handleOnChange={handleChange}
                value={fee.name}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}