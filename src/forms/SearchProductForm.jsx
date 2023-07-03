import React, { useState, useEffect } from 'react'

import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './SearchProductForm.module.css'

export default function ProductForm({ handleSubmit, btnText }) {

    const [ product, setProduct ] = useState({
                                                type:'',
                                                subType:'',
                                                specification:'',
                                                unity: '',
                                            })


    const submit = (e) => {
        e.preventDefault()
        handleSubmit({ ...product})
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Tipo de Produto"
                name="type"
                placeholder="(ex: Comida, Bebida, etc)"
                handleOnChange={handleChange}
                value={product.type}
            />
            <Input 
                type="text"
                text="Subtipo de Produto"
                name="subType"
                placeholder="(ex: Esfiha, Porção, Chopp, Suco, etc)"
                handleOnChange={handleChange}
                value={product.subType}
            />
            <Input 
                type="text"
                text="Especificação (sabor ou marca)"
                name="specification"
                placeholder="(ex: Carne, Frango, Heineken, Coca-cola, etc)"
                handleOnChange={handleChange}
                value={product.specification}
            />
            <Input 
                type="text"
                text="Unidade de Venda"
                name="unity"
                placeholder="(ex: unidade, 500ml, lata de 350ml, garrafa de 750ml, etc)"
                handleOnChange={handleChange}
                value={product.unity}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}