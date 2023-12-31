import React, {useState, useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import Button from '../formItens/Button'
import DeliveryGapForm from '../forms/DeliveryGapForm'
import DeliveryFeeForm from '../forms/DeliveryFeeForm'

import { setPath } from '../slices/locationSlice'
import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'

import styles from './Home.module.css'

export default function Home() {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ store, setStore ] = useState("Seja Bem-vindo(a)")
    const [ deliveryGap, setDeliveryGap ] = useState('0 a 0 minutos')
    const [ pickupGap, setPickupGap ] = useState('0 a 0 minutos')
    const [ deliveryFee, setDeliveryFee ] = useState({})
    
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const clientNumber = useSelector((state) => state.login.cliente)

    const location = useLocation()
    dispatch(setPath(location.pathname))

    const apiUrl = process.env.REACT_APP_API_URL
       
    const IsOpen = useCallback((numberClient) => {
        fetch (`${apiUrl}/client/isopen`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: numberClient})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Pesquisa realizada com sucesso!`) {
                    setIsOpen(data.content.isOpen)
                    setStore(data.content.name)
                }
            })
            .catch((err) => console.log(err))
    },[apiUrl])

    function HandleOpenCloseClick(openOrClose) {
        fetch (`${apiUrl}/client/openclose`, {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber, isOpen: !openOrClose})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Sua loja foi aberta com SUCESSO' || data.msg === 'Sua loja foi fechada com SUCESSO') {
                dispatch(setTipoMensagem('sucess'))
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1}))
        })
        .catch((err) => console.log(err))
    }

    function HandleDeliveryGapClick(data) {
        fetch (`${apiUrl}/client/deliverygap`, {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber, deliveryGap: data})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Tempo DELIVERY atualizado com sucesso') {
                dispatch(setTipoMensagem('sucess'))
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1}))
        })
        .catch((err) => console.log(err))
    }

    function HandlePickupGapClick(data) {
        fetch (`${apiUrl}/client/pickupgap`, {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber, pickupGap: data})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Tempo BALCÃO atualizado com sucesso') {
                dispatch(setTipoMensagem('sucess'))
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1}))
        })
        .catch((err) => console.log(err))
    }

    function HandleDeliveryFeeClick(data) {
        fetch (`${apiUrl}/client/deliveryfee`, {
            method: 'PATCH',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber, neighborhood: data.neighborhood, fee:data.taxa})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Taxa de Entrega atualizada com sucesso') {
                dispatch(setTipoMensagem('sucess'))
            } else {
                dispatch(setTipoMensagem('error'))
            }
            dispatch(setMensagem({msg: data.msg, count: count+1}))
        })
        .catch((err) => console.log(err))
    }

    const DeliveryGap = useCallback(() => {
        fetch (`${apiUrl}/client/getdeliverygap`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setDeliveryGap(data.content.deliveryGap)
            } else {
                setDeliveryGap("erro")
            }
        })
        .catch((err) => console.log(err))  
    },[apiUrl, clientNumber])

    const PickupGap = useCallback(() => {
        fetch (`${apiUrl}/client/getpickupgap`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setPickupGap(data.content.pickupGap)
            } else {
                setPickupGap("erro")
            }
        })
        .catch((err) => console.log(err))
    },[apiUrl, clientNumber])

    const DeliveryFee = useCallback(() => {
        fetch (`${apiUrl}/client/getdeliveryfee`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber})
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setDeliveryFee(data.content.deliveryFee)
            } else {
                setDeliveryFee("erro")
            }
        })
        .catch((err) => console.log(err))  
    },[apiUrl, clientNumber])

    function objectToArray(obj) {
        let arrayFromObject = []

        Object.keys(obj).forEach(function(key) {
            arrayFromObject.push([key, obj[key]])
        })
        arrayFromObject.pop()

        return arrayFromObject.sort()
    }

    useEffect(() => {
        function Neighborhood () {
            fetch (`${apiUrl}/client/getdeliveryfee`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: clientNumber})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa realizada com sucesso!") {
                    const content = data.content.deliveryFee
                    setDeliveryFee(content)
                } 
            })
            .catch((err) => console.log(err))
        }

        Neighborhood()
        console.log(deliveryFee)
    },[])

    useEffect(() => {
        IsOpen(clientNumber)
    },[count, IsOpen, clientNumber])

    useEffect(() => {
        DeliveryGap()
    },[count, DeliveryGap])

    useEffect(() => {
        PickupGap()
    },[count, PickupGap])

    useEffect(() => {
        DeliveryFee()
    },[count, DeliveryFee])

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
                <h1 className={styles.text}>{store}</h1>
                {
                    isOpen === true
                    ?
                    <h3 className={styles.textOpen}>LOJA ABERTA</h3>
                    :
                    <h3 className={styles.textClose}>LOJA FECHADA</h3>
                }
                <Button text="Alterar" handleOnClick={() => HandleOpenCloseClick(isOpen)}/>
                <div style={{marginTop:50}}>
                    <Container customClass='nowrap'>
                        <Container customClass='column'>
                            <h3 className={styles.text}>Tempo DELIVERY</h3>
                            <h2>{deliveryGap}</h2>
                            <DeliveryGapForm 
                                handleSubmit = {HandleDeliveryGapClick}
                                btnText = "Atualizar"
                            />
                        </Container>
                        <Container customClass='column'>
                            <h3 className={styles.text}>Tempo BALCÃO</h3>
                            <h2>{pickupGap}</h2>
                            <DeliveryGapForm 
                                handleSubmit = {HandlePickupGapClick}
                                btnText = "Atualizar"
                            />
                        </Container>
                        <Container customClass='column'>
                            <h3 className={styles.text}>{`TAXA de Entrega`}</h3>
                            <h2>Ver tabela abaixo</h2>
                            <DeliveryFeeForm
                                handleSubmit = {HandleDeliveryFeeClick}
                                btnText = "Atualizar"
                            />
                        </Container>
                    </Container>
                </div>
                <Container customClass ='column_height'>
                    <div>
                        <div>
                            <h1 className={styles.text}>Taxa de Entrega por Local</h1>
                        </div>
                        <div>
                            <table className={styles.tabela}>
                                <thead>
                                    <tr>
                                        <td className={styles.celtabhead}>Bairro ou Distrito</td>
                                        <td className={styles.celtabhead}>Taxa de Entrega</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        objectToArray(deliveryFee).map((elemento) => (
                                            <tr>
                                                <td className={styles.celtabbody}>{elemento[0]}</td>
                                                <td className={styles.celtabnome}>{
                                                    (elemento[1] !== 0)
                                                    ?
                                                    `R$ ${Number(elemento[1]).toFixed(2).replace(".",",")}` 
                                                    :
                                                    `não entregamos nesse local`
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </Container>
        )
    }
}

