import React, { useState } from 'react'

import Input from '../formItens/Input'

import styles from './SearchProductForm.module.css'

export default function ProductForm({ handleSubmit , btnText }) {

    const [ product, setProduct ] = useState({ specification:"" })

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(product.specification)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setProduct({ ...product, [e.target.name]: e.target.value})
        submit(e)
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Pesquisa por 'Especificação'"
                name="specification"
                placeholder="digite aqui a palavra para pesquisar"
                handleOnChange={handleChange}
                value={product.specification}
            />
        </form>

    )
}