import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Input from '../formItens/Input'
import Select from '../formItens/Select'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function DeliveryFee({ handleSubmit, btnText }) {

    const apiUrl = process.env.REACT_APP_API_URL
    const clientNumber = useSelector((state) => state.login.cliente)

    const [ fee, setFee ] = useState({name: "", taxa:0})
    const [neighborhoods, setNeighborhoods] = useState([])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(fee)
    }

    const handleChange = (e) => {
        setFee({ ...fee, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        function Neighborhood () {
            fetch (`${apiUrl}/client/getdeliveryfee`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: clientNumber})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa realizada com sucesso!") {
                    const content = data.content.deliveryFee
                    setNeighborhoods(Object.keys(content))
                } 
            })
            .catch((err) => console.log(err))
        }

        Neighborhood()
        console.log(neighborhoods)
    },[])

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
                ops={neighborhoods}
                text="Bairro ou Distrito"
                size={1}
                handleOnChange={handleChange}
                value={fee.name}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}