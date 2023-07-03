import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import PromotionImageForm from '../forms/PromotionImageForm'

import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function CadastrarImagemPromocao() {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)

    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const navigate = useNavigate()
    const location = useLocation()
    const productId = location.state.id

    dispatch(setPath(location.pathname))

    function CadastrarImagemPromocao (formData) {
        const apiUrl = process.env.REACT_APP_API_URL

        const arrayBufferImage = formData.promotionImage
        const uint8ArrayImage = new Uint8Array(arrayBufferImage)
        const base64StringImage = btoa(String.fromCharCode.apply(null, uint8ArrayImage))

        console.log(JSON.stringify({id: productId, image: base64StringImage}))

        fetch (`http://${apiUrl}/product/promotionimageregister`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id: productId, image: base64StringImage })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Imagem da promoção guardada com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
                    navigate('/promocoes')
                } else {
                    dispatch(setTipoMensagem('error'))
                }
                dispatch(setMensagem({msg: data.msg, count:count+1}))
            })
            .catch((err) => console.log(err))
    }

    const toPromoImageForm = {_id: productId, image:""}

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
                <h1 className={styles.text}>Cadastrar Imagem para Promoção</h1>
                <PromotionImageForm 
                    btnText='Criar Promoção'
                    handleSubmit={CadastrarImagemPromocao} 
                    initialData={toPromoImageForm} />
            </Container>
        )
    }
}