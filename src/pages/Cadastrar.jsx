import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import ProductForm from '../forms/ProductForm'

import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Cadastrar() {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const clientNumber = useSelector((state) => state.login.cliente)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    function CadastrarProduto(dadosForm) {
        const apiUrl = process.env.REACT_APP_API_URL
        
        fetch (`${apiUrl}/product/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    clientNumber: clientNumber,
                    type: dadosForm.product.type,
                    subType: dadosForm.product.subType,
                    specification: dadosForm.product.specification,
                    subSpecification: dadosForm.product.subSpecification,
                    unity: dadosForm.product.unity,
                    value: dadosForm.product.value
                })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Produto cadastrado com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
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
                <h1 className={styles.text}>Cadastrar Produto</h1>
                <ProductForm btnText='Cadastrar Produto' handleSubmit={CadastrarProduto} initialData={{}} />
            </Container>
        )
    }
}