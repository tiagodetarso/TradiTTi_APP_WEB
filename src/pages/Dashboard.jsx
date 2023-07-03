import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'

import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Dashboard() {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    if (!userId) {
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Não há usuário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
        )
    } else {
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Dashboard</h1>
            </Container>
        )
    }
}