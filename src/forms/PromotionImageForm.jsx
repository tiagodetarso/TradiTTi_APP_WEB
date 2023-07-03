import React, { useState } from 'react'

import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './ProductImageForm.module.css'

export default function ProductImageForm({ handleSubmit, btnText, initialData }) {

    const prevImage = initialData.promotionImage

    const [ picture, setPicture ] = useState({image:""})
    const [ fileBuffer, setFileBuffer ] = useState({image:null})
    const [ selectedFile, setSelectedFile] = useState({image:false})
    
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(fileBuffer)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    const buffer = event.target.result
                    setFileBuffer((prevFileBuffer) => ({
                        ...prevFileBuffer,
                        [e.target.name]: buffer,
                    }))
                }
                setPicture(file)
                reader.readAsArrayBuffer(file)
            } else {
                setSelectedFile((prevSelectedFile) => ({
                    ...prevSelectedFile,
                    [e.target.name]: false
                }))
            }
    }

    return (
        <div>
            {
                (initialData.image !== "") ?
                <img className={styles.picture} src={`data:image/jpeg;base64,${prevImage}`} alt="Imagem" /> :
                <p>Não há imagem cadastrada para essa promoção ainda.</p>
            }
            <form onSubmit={submit} className={styles.form}>
                <Input 
                    type="file"
                    text="Definir nova imagem p/o Produto"
                    name="promotionImage"
                    handleOnChange={handleChange}
                    value={picture.promotionImage}
                    accept={"image/*"}
                />
                <SubmitButton text={btnText} />
            </form>
        </div>
    )
}