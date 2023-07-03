import React, { useState } from 'react'

import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

import { useDispatch } from 'react-redux'
import { setCliente, setUsuario, setSenha } from '../slices/loginSlice'

export default function LoginForm({ handleSubmit, btnText }) {

    const dispatch = useDispatch()
    const [ user, setUser ] = useState( {clientNumber:'', userName:'', password:''} )

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(user)
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
        if (e.target.name === 'clientNumber') {
            dispatch(setCliente(e.target.value))
        } else if (e.target.name === 'userName') {
            dispatch(setUsuario(e.target.value))
        } else if (e.target.name === 'password') {
            dispatch(setSenha(e.target.value))
        }
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="number"
                text="Nº do Cliente"
                name="clientNumber"
                placeholder="Digite o número do cliente"
                handleOnChange={handleChange}
                value={user.clientNumber}
            />
            <Input 
                type="text"
                text="Usuário"
                name="userName"
                placeholder="Digite seu nome de usuário"
                handleOnChange={handleChange}
                value={user.userName}
            />
            <Input 
                type="password"
                text="Senha"
                name="password"
                placeholder="Digite sua senha"
                handleOnChange={handleChange}
                value={user.password}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}