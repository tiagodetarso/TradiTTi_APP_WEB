import React, {useState} from 'react'
import { useSelector } from 'react-redux'
 
import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

export default function RetrievePassCodeSendForm({ handleSubmit, btnText }) {

    const userName = useSelector((state) => state.login.usuario)
    const clientNumber = useSelector((state) => state.login.cliente)
    const [ user, setUser ] = useState(
        {
            clientNumber: clientNumber,
            userName: userName,
            password: '',
            newPassword: '',
            confirmNewPassword: ''
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
                type="password"
                text="Senha Atual"
                name="password"
                placeholder="Digite sua nova senha"
                handleOnChange={handleChange}
                value={user.password}
            />
            <Input 
                type="password"
                text="Nova Senha"
                name="newPassword"
                placeholder="Digite sua nova senha"
                handleOnChange={handleChange}
                value={user.newPassword}
            />
            <Input 
                type="password"
                text="Confirmação da Nova Senha"
                name="confirmNewPassword"
                placeholder="Digite novamente sua nova senha"
                handleOnChange={handleChange}
                value={user.confirmNewPassword}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}