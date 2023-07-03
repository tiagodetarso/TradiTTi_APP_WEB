import React, { useState } from 'react'

import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function ProductForm({ handleSubmit, btnText, initialData }) {

    const [ product, setProduct ] = useState(initialData)
    
    const submit = (e) => {
        e.preventDefault()
        handleSubmit({ product })
    }

    const handleChange = (e) => {
        e.preventDefault()
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
                text="Descrição"
                name="subSpecification"
                placeholder="(ex: 500g de alcatra, 600g de batata frita, 250g de cebola agridoce ...)"
                handleOnChange={handleChange}
                value={product.subSpecification}
            />
            <Input 
                type="text"
                text="Unidade de Venda"
                name="unity"
                placeholder="(ex: unidade, 500ml, lata de 350ml, garrafa de 750ml, etc)"
                handleOnChange={handleChange}
                value={product.unity}
            />
            <Input 
                type="number"
                text="Valor Unitário R$"
                name="value"
                step={.01}
                placeholder="Digite o valor unitário"
                handleOnChange={handleChange}
                value={product.value}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}
