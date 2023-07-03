import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import NewPassForm from '../forms/NewPassForm'
import LinkButton from '../formItens/LinkButton'

import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function RedefinirSenha() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_API_URL
    const count = useSelector((state) => state.loginresponse.mensagem.count)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    function AlterarSenha(form) {
        fetch (`http://${apiUrl}/clientuser/resetpass`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(form)
        }) 
        .then(resp => resp.json())
        .then((data) => {
            if (data.msg === "Senha redefinida com sucesso!") {
                dispatch(setTipoMensagem('sucess'))
                navigate('/')
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1 }))
            })
            .catch((err) => console.log(err))

        console.log(JSON.stringify(form))
    }


    return(
        <Container customClass='column_height'>
            <h1 className={styles.text}>Alterar Senha</h1>
            <NewPassForm handleSubmit={AlterarSenha} btnText='Redefinir Senha' />
            <LinkButton to='/recuperacaosenha' text='Voltar à tela anterior'/>
        </Container>
    )
}