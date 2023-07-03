import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
 
import Input from '../formItens/Input'
import SubmitButton from '../formItens/SubmitButton'

import styles from './LoginForm.module.css'

import { setClientNumber, setUserName } from '../slices/retrieveSlice'


export default function RetrievePassCodeSendForm({ handleSubmit, btnText }) {

    const dispatch = useDispatch()
    const [ user, setUser ] = useState( {clientNumber:'', userName:''} )

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(user)
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
        if (e.target.name === 'clientNumber') {
            dispatch(setClientNumber(e.target.value))
        } else if (e.target.name === 'userName') {
            dispatch(setUserName(e.target.value))
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
            <SubmitButton text={btnText} />
        </form>
    )
}