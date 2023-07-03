import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'

import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Gestor() {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const isManager = useSelector((state) => state.loginresponse.content.isManager)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    if (!userId) {
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Não há usuário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
        )
    } else if (userId && !isManager) {
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Você não tem acesso a essa aba!</h1>
            </Container>
        )
    } else if (userId && isManager){
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Página do Gestor</h1>
            </Container>
        )
    }
}