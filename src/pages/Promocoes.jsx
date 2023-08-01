import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import differenceBy from 'lodash/differenceBy'
import { createTheme } from 'react-data-table-component'
import Modal from 'react-modal'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import ProductTable from '../layout/ProductTable'
import Button from '../formItens/Button'
import ButtonX from '../formItens/ButtonX'
import PromotionForm from '../forms/PromotionForm'
import PromotionImageForm from '../forms/PromotionImageForm'
import { promotionTableColumns } from '../layout/PromotionTableConfig'
import { CustomLoader } from '../layout/TableCustomLoader.jsx'
import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Promocoes() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const clientNumber = useSelector((state) => state.login.cliente)
    const apiUrl = process.env.REACT_APP_API_URL

    const location = useLocation()
    dispatch(setPath(location.pathname))

    const [ result, setResult ] = useState([])

    const [ rows, setRows ] = useState([])
    const [ toggledClearRows, setToggledClearRows ] = useState(false)
 
    const [pending, setPending] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Loading Effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false)
        }, 3000)
        return () => clearTimeout(timeout)
    },[pending])

    const NumberWeekDay = {
        7:'Nenhum dia específico',
        0:'Domingo',
        1:'Segunda-feira',
        2:'Terça-feira',
        3:'Quarta-feira',
        4:'Quinta-feira',
        5:'Sexta-feira',
        6:'Sábado'
    }

    // Função para listar promoções
    function ListarPromocoes() {
        fetch (`http://${apiUrl}/product/promotionlist`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber})
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            const receivedData = data ? data : {msg:"", content:""}
            if (receivedData.msg === "Pesquisa bem sucedida!") {
                const content = receivedData.content
                for (const rowResult of content) {
                    rowResult.promotionInitialDate = rowResult.promotionInitialDate.slice(0,-14)
                    rowResult.promotionFinalDate = rowResult.promotionFinalDate.slice(0,-14)
                    rowResult.fixPromotionDay = NumberWeekDay[rowResult.fixPromotionDay]
                }
                setResult(content)
            } 
        })
        .catch((err) => console.log(err))
    }

    // Buscar dados dos Produtos ao iniciar a página
    useEffect(() => {ListarPromocoes()},[count])

    // Gerenciar seleção de linhas
    function RowsChange( rows ) {
        const selection = rows.selectedRows[0]
        setRows(selection)
        setToggledClearRows(false)
    }

    // Context Actions
    const contextActions = useMemo(() => {
        
		const handleDelete = () => {
			if (window.confirm(`Tem certeza que deseja deletar:\r ${rows.map(r => `Promoção de ${r.subtype} - ${r.specification}?`)}?`)) {
                for (const row of rows) {
                    fetch (`http://${apiUrl}/product/deletepromotion`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({id: row._id})
                    })
                    .then(resp => resp.json())
                    .then((data) => {
                        const receivedData = data ? data : {msg:""}
                        if (receivedData.msg === "Promocao(oes) deletada(s) com sucesso!") {
                            dispatch(setTipoMensagem('sucess'))
                        } else {
                            dispatch(setTipoMensagem('error'))
                        }
                        dispatch(setMensagem({msg: receivedData.msg, count:count+1}))
                    })
                    .catch((err) => console.log(err))
                }
				setResult(differenceBy(result, rows, 'subType'&&'specification'))
                setToggledClearRows(true)
			}
		}

        const handleEdit = () => {
            if (rows.length > 1) {
                dispatch(setTipoMensagem('error'))
                dispatch(setMensagem({msg: "Você só pode editar uma promoção de cada vez!", count:count+1}))
                setToggledClearRows(true)
            } else {
                setIsModalOpen(true)
            } 
        }

		return (
            <div style={{ flexDirection:'row' }}>
                <ButtonX text='Excluir' handleOnClick={handleDelete} />
                <Button text='Editar' handleOnClick={handleEdit} />
            </div>
		)
	},[result, rows])

    // Função para editar produto (dentro do modal)
    function ModalSubmitForm(formData) {
        fetch (`http://${apiUrl}/product/promotionedit`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Promoção alterada com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
                } else {
                    dispatch(setTipoMensagem('error'))
                }
                dispatch(setMensagem({msg: data.msg, count:count+1}))
            })
            .catch((err) => console.log(err))

            setIsModalOpen(false)
            setToggledClearRows(true)
    }

    // Função para Editar imagem do produto (dentro do modal)
    function HandleImageChange (data) {

        const arrayBufferImage = data.promotionImage
        const uint8ArrayImage = new Uint8Array(arrayBufferImage)
        const base64StringImage = btoa(String.fromCharCode.apply(null, uint8ArrayImage))

        fetch (`http://${apiUrl}/product/promotionimageedit`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    image: base64StringImage
                })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Imagem guardada com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
                    setIsModalOpen(false)
                } else {
                    dispatch(setTipoMensagem('error'))
                }
                dispatch(setMensagem({msg: data.msg, count:count+1}))
                setToggledClearRows(true)
            })
            .catch((err) => console.log(err))
    }

    // Função para fechar modal
    function FecharModal() {
        setIsModalOpen(false)
        setToggledClearRows(true)
    }

    // Tema para tabela
    createTheme('traditti', {
        text: {
          primary: '#ffffff',
          secondary: '#E5E059',
        },
        background: {
          default: 'transparent',
        },
        context: {
          background: '#999799',
          text: '#000000',
        },
        divider: {
          default: '#999799',
        },
    })

    //Renderização
    if (!userId) {
        return(
            <Container customClass='column_height'>
                <h1 className={styles.text}>Não há usuário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
        )
    } else {
        return(
            <Container customClass ='column_height'>
                <h1 className={styles.text}>Promoções</h1>
                <ProductTable 
                    tableData={result}
                    tableColumns={promotionTableColumns}
                    tableTitle='Lista de Promoções'
                    selectable={true}
                    clearRows={toggledClearRows}
                    pending={pending}
                    prgssComponent={<CustomLoader />}
                    hoverHighlight={true}
                    hoverPointer={true}
                    tableTheme={'traditti'}
                    actions={contextActions}
                    RowsChange={RowsChange}
                />
                <Modal 
                    isOpen={isModalOpen}
                    onRequestClose = {() => {setIsModalOpen(false)}}
                    style={{
                        overlay:{
                            position:'fixed',
                            top: '10.7em',
                            left: 50,
                            right: 50,
                            bottom:10,
                            backgroundColor: '#ffffff',
                            zIndex: 999
                        },
                        content: {
                            position: 'absolute',
                            top: '20px',
                            left: '40px',
                            right: '40px',
                            bottom: '40px',
                            border: '1px solid #ccc',
                            background: '#999799',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }
                    }}
                >
                    <PromotionForm btnText='Alterar' handleSubmit={ModalSubmitForm} initialData={rows}/>
                    <PromotionImageForm btnText='Definir/Alterar Imagem' handleSubmit={HandleImageChange} initialData={rows}/>
                    <ButtonX text="Fechar" handleOnClick={FecharModal}/>
                </Modal>
            </Container>
        )
    }
}