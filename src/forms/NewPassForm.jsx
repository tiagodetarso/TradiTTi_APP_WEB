import React, {useState} from 'react'
import { useSelector } from 'react-redux'
 
import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function RetrievePassCodeSendForm({ handleSubmit, btnText }) {

    const userName = useSelector((state) => state.retrieve.userName)
    const clientNumber = useSelector((state) => state.retrieve.clientNumber)
    const [ user, setUser ] = useState(
        {
            clientNumber: clientNumber,
            userName: userName,
            confirmationRetrieveCode: '',
            password: '',
            confirmPassword: ''
        }
    )

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(user)
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
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
                type="text"
                text="Código de Recuperação"
                name="confirmationRetrieveCode"
                placeholder="Digite o código de recuperação recebido por e-mail"
                handleOnChange={handleChange}
                value={user.confirmationRetrieveCode}
            />
            <Input 
                type="password"
                text="Nova Senha"
                name="password"
                placeholder="Digite sua nova senha"
                handleOnChange={handleChange}
                value={user.password}
            />
            <Input 
                type="password"
                text="Confirmação Senha"
                name="confirmPassword"
                placeholder="Digite novamente sua nova senha"
                handleOnChange={handleChange}
                value={user.confirmPassword}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}