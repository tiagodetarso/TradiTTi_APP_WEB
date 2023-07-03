import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import RetrieveForm from '../forms/RetrievePassCodeSendForm'
import LinkButton from '../formItens/LinkButton'

import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function RecuperacaoSenha() {

    const apiUrl = process.env.REACT_APP_API_URL
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const count = useSelector((state) => state.loginresponse.mensagem.count)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    function EnviarCodigo(form) {
        fetch (`http://${apiUrl}/clientuser/retrievepass`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(form)
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            if (data.msg === `Código de recuperação enviado para ${data.content}`) {
                dispatch(setTipoMensagem('sucess'))
                navigate('/alterarsenha')
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1 }))
        })
        .catch((err) => console.log(err))
    }

    return(
        <Container customClass='column_height'>
            <h1 className={styles.text}>Recuperação de Senha</h1>
            <RetrieveForm handleSubmit={EnviarCodigo} btnText='Enviar Código de Recuperação'/>
            <LinkButton to='/' text='Voltar à tela de Login'/>
        </Container>
    )
}
