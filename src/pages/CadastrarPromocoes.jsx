import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import PromotionForm from '../forms/PromotionForm'

import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function CadastrarPromocoes() {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)

    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const navigate = useNavigate()

    const location = useLocation()
    const productId = location.state.id
    const agora = new Date()

    dispatch(setPath(location.pathname))

    const promotionInitialData = {
        id: productId,
        promotionValue: 0,
        fixPromotionDay: 'Nenhum dia específico',
        promotionInitialDate: agora,
        promotionFinalDate: agora
    }

    function CadastrarPromocao (formData) {
        const apiUrl = process.env.REACT_APP_API_URL

        fetch (`http://${apiUrl}/product/promotionregister`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                    promotionValue: formData.promotionValue,
                    fixPromotionDay: formData.fixPromotionDay,
                    promotionInitialDate: formData.promotionInitialDate ? formData.promotionInitialDate : agora,
                    promotionFinalDate: formData.promotionInitialDate ? formData.promotionInitialDate : agora
                })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Promoção cadastrada com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
                    navigate('/cadastrarimagempromocao', {state:{id:productId}})
                } else {
                    dispatch(setTipoMensagem('error'))
                }
                dispatch(setMensagem({msg: data.msg, count:count+1}))
            })
            .catch((err) => console.log(err))
    }

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
                <h1 className={styles.text}>Criar Promoção</h1>
                <PromotionForm btnText='Criar Promoção' handleSubmit={CadastrarPromocao} initialData={promotionInitialData} />
            </Container>
        )
    }
}