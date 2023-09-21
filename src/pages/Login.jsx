import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import LoginForm from '../forms/LoginForm'
import LinkButton from '../formItens/LinkButton'
import Mensagem from '../layout/Mensagem'

import { useDispatch, useSelector } from 'react-redux'
import { cleanSenha } from '../slices/loginSlice'
import { setMensagem, setTipoMensagem, setContent } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Login() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tipoMensagem = useSelector((state) => state.loginresponse.tipoMensagem)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const apiUrl = process.env.REACT_APP_API_URL

    const location = useLocation()
    dispatch(setPath(location.pathname))
    
    function Logar(userClient) {
        fetch (`${apiUrl}/clientuser/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userClient)
        })
        .then(resp => resp.json())
        .then((data) => {
            const receivedData = data ? data : {msg:"", content:""}
            if (receivedData.msg === "Login realizado com sucesso") {
                dispatch(setContent(receivedData.content))
                dispatch(setTipoMensagem('sucess'))
                navigate("/home")
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(cleanSenha())
            dispatch(setMensagem({msg: receivedData.msg, count:count+1}))

        })
        .catch((err) => console.log(err))
    }

    return (
        <Container customClass='column_height'>
            <div style={{height: '1.5em', width: '100%'}}>
                    <Mensagem type={tipoMensagem} />
                </div>
            <h1 className={styles.text}>Login</h1>
            <LoginForm handleSubmit={Logar} btnText="Entrar"/>
            <LinkButton to='/recuperacaosenha' text="Esqueceu a senha?"/>
        </Container>
    )

}