import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setMensagem, setTipoMensagem, cleanContent } from '../slices/loginResponseSlice'

import Container from './Container'
import ButtonX from '../formItens/ButtonX'
import Mensagem from './Mensagem'

import styles from './NavBar.module.css'

import logo from '../images/logo.png'

export default function NavBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const userName = useSelector((state) => state.loginresponse.content.name)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const tipoMensagem = useSelector((state) => state.loginresponse.tipoMensagem)

    function Sair() {
        dispatch(cleanContent())
        dispatch(setMensagem({msg:'Você esta desconectado.', count: count+1}))
        dispatch(setTipoMensagem('sucess'))
        navigate('/')
    }

    return (
        <nav className={styles.navbar}>
            <Container customClass='column_width'>
                <Container>
                    <img src={logo} alt="traditti" />
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/cadastrarproduto">Cadastrar</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/editarproduto">Produtos</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/promocoes">Promoções</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/cupons">Cupons</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/alterarsenha">Alterar Senha</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/gestor">Acesso Gestor</Link>
                        </li>
                    </ul>
                    <h5 className={styles.status}>
                        {!userId ?
                            (<div className={styles.desconectado}>
                                Não há usuário conectado ao sistema. FAÇA SEU LOGIN!
                            </div>) :
                            (<div className={styles.conectado}>
                                Conectado - {userName}
                            </div>)
                        }
                    </h5>
                    {userId && <ButtonX text="Sair" handleOnClick={Sair} />}
                </Container>
                <div style={{height: '1.5em', width: '100%'}}>
                    <Mensagem type={tipoMensagem} />
                </div>
            </Container>
        </nav>    
    )
}