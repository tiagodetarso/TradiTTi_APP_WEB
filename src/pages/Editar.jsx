import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import differenceBy from 'lodash/differenceBy'
import { createTheme } from 'react-data-table-component'
import Modal from 'react-modal'

import Container from '../layout/Container'
import LinkButton from '../formItens/LinkButton'
import SearchProductForm from '../forms/SearchProductForm'
import ProductTable from '../layout/ProductTable'
import Button from '../formItens/Button'
import ButtonX from '../formItens/ButtonX'
import LillButton from '../formItens/LillButton'
import ProductForm from '../forms/ProductForm'
import ProductImageForm from '../forms/ProductImageForm'
import { CustomLoader } from '../layout/TableCustomLoader.jsx'
import { setMensagem, setTipoMensagem } from '../slices/loginResponseSlice'
import { setPath } from '../slices/locationSlice'

import styles from './Home.module.css'

export default function Editar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.loginresponse.content.id)
    const count = useSelector((state) => state.loginresponse.mensagem.count)
    const clientNumber = useSelector((state) => state.login.cliente)
    const apiUrl = process.env.REACT_APP_API_URL

    const location = useLocation()
    dispatch(setPath(location.pathname))

    const [ result, setResult ] = useState([])
    const [ list, setList ] = useState([])
    const [ thereState, setThereState ] = useState(false)

    const [ rows, setRows ] = useState([])

    const [ toggledClearRows, setToggledClearRows ] = useState(false)
 
    const [ pending, setPending ] = useState(true)
    const [ isModalOpen, setIsModalOpen ] = useState(false)


    function ChangeThereIs (r) {
        setThereState(!thereState)
        fetch (`${apiUrl}/product/editthereis`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: r._id,
                        thereIs: r.thereIs,
                    })
                })
                .then(resp => resp.json())
                .then((data) => {
                    if (data.msg === `Produto alterado com sucesso!`) {
                        console.log("Status de produto alterado")
                    } else {
                        console.log("Status do produto não foi alterado")
                    }
                })
                .catch((err) => console.log(err))
    }

    const productTableColumns = [
        {
            id:'thereIs',
            name:"",
            selector: row => row.thereIs ? <LillButton text='V' handleOnClick={() => ChangeThereIs(row)} customClass='Tem'/> : <LillButton text='X' handleOnClick={() => ChangeThereIs(row)} customClass='Ntem'/>,
            sortable: true,
            width: '5%'
        },
        {
            id:'type',
            name:"Tipo",
            selector: row => row.type,
            sortable: true,
            width: '14%'
        },
        {
            id:'subType',
            name:"Grupo",
            selector: row => row.subType,
            sortable: true,
            width: '14%'
            
        },
        {
            id:'specification',
            name:"Especificação",
            selector: row => row.specification,
            sortable: true,
            width: '29%'
        },
        {
            id:'unity',
            name:"Und",
            selector: row => row.unity,
            sortable: true,
            width: '14%'
        },
        {
            id:'value',
            name:"Preço",
            selector: row => `R$ ${row.value.toFixed(2)}`,
            sortable: true,
            width: '14%'
        },
    ]

    // Loading Effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false)
        }, 3000)
        return () => clearTimeout(timeout)
    },[pending])

    // Função para listar produtos
    const Listar = useCallback(() => {
        fetch (`${apiUrl}/product/list`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({clientNumber: clientNumber})
        })
        .then(resp => resp.json())
        .then((data) => {
            const receivedData = data ? data : {msg:"", content:""}
            if (receivedData.msg === "Pesquisa bem sucedida!") {
                setResult(receivedData.content)
            } 
        })
        .catch((err) => console.log(err))
    },[apiUrl, clientNumber])

    function Search(text) {
        text.length < 2 
        ?
        setList(result)
        :
        setList(
            result.filter(item => {
                if ((item.specification).indexOf(text) > -1 ) {
                    return true
                } else {
                    return false
                }
            })
        )
    }

    function SettingList(data) {
        setList(data)
    }

    // Buscar dados dos Produtos ao iniciar a página e ao pesquisar
    useEffect(() => {
        Listar()
    },[Listar, thereState, count])

    useEffect(() => {
        SettingList(result)
    }, [count, result])

    // Gerenciar seleção de linhas
    function RowsChange( rows ) {
        const selection = rows.selectedRows
        setRows(selection)
        setToggledClearRows(false)
    }

    // Função do botão em ExpandedComponent
    function ExpandedButton(data) {
        navigate('/cadastrarpromocoes', {state:{id:data._id}})
    }

    // Função para mostrar a descrição na expansão da linha 
    const XpandedComponent = ({data}) =>
        <pre> 
            {data['subSpecification']}
            <Button handleOnClick={() => ExpandedButton(data)} text='Criar Promo' />
        </pre>

    // Context Actions
    const contextActions = useMemo(() => {
        
		const handleDelete = () => {
			if (window.confirm(`Tem certeza que deseja deletar:\r ${rows.map(r => r.subType+' '+r.specification+' ')}?`)) {
                for (const row of rows) {
                    fetch (`${apiUrl}/product/delete`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({id: row._id})
                    })
                    .then(resp => resp.json())
                    .then((data) => {
                        const receivedData = data ? data : {msg:""}
                        if (receivedData.msg === "Produto(s) deletado(s) com sucesso!") {
                            dispatch(setTipoMensagem('sucess'))
                        } else {
                            dispatch(setTipoMensagem('error'))
                        }
                        dispatch(setMensagem({msg: receivedData.msg, count:count+1}))
                    })
                    .catch((err) => console.log(err))
                    setResult(differenceBy(result, rows, 'subType'&&'specification'))
                    setToggledClearRows(true)
                }
		}
    }
    
        const handleEdit = () => {
            if (rows.length > 1) {
                dispatch(setTipoMensagem('error'))
                dispatch(setMensagem({msg: "Você só pode editar um produto de cada vez!", count:count+1}))
                setToggledClearRows(true)
            } else {
                setIsModalOpen(true)
            } 
        }

		return (
            <div style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonX text='Excluir' handleOnClick={handleDelete} /> 
                <Button text='Editar' handleOnClick={handleEdit} />
            </div>
		)
	},[apiUrl, count, dispatch, result, rows])

    // Função para editar produto (dentro do modal)
    function ModalSubmitForm(formData) {
        setToggledClearRows(true)
        fetch (`${apiUrl}/product/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.product._id,
                    clientNumber: clientNumber,
                    type: formData.product.type,
                    subType: formData.product.subType,
                    specification: formData.product.specification,
                    subSpecification: formData.product.subSpecification,
                    unity: formData.product.unity,
                    value: formData.product.value
                })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === `Produto alterado com sucesso!`) {
                    dispatch(setTipoMensagem('sucess'))
                } else {
                    dispatch(setTipoMensagem('error'))
                }
                dispatch(setMensagem({msg: data.msg, count:count+1}))
            })
            .catch((err) => console.log(err))

            setIsModalOpen(false)
    }

    // Função para Editar imagem do produto (dentro do modal)
    function HandleImageChange (sentData) {

        const arrayBufferImage = sentData.image
        const uint8ArrayImage = new Uint8Array(arrayBufferImage)
        const base64StringImage = btoa(String.fromCharCode.apply(null, uint8ArrayImage))

        fetch (`http://${apiUrl}/product/imageedit`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: sentData.id,
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
                <h1 className={styles.text}>Editar Produto</h1>
                <div style={{marginTop:10, marginLeft:140, alignSelf:'flex-start'}}>
                    <SearchProductForm handleSubmit={Search} />
                </div>
                <ProductTable 
                    tableData={list}
                    tableColumns={productTableColumns}
                    tableTitle='Lista de Produtos'
                    selectable={true}
                    expandable={true}
                    clearRows={toggledClearRows}
                    expandableComponent={XpandedComponent}
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
                    <ProductForm btnText='Alterar' handleSubmit={ModalSubmitForm} initialData={rows[0]}/>
                    <ProductImageForm btnText='Definir/Alterar Imagem' handleSubmit={HandleImageChange} initialData={rows[0]}/>
                    <ButtonX text="Fechar" handleOnClick={FecharModal}/>
                </Modal>
            </Container>
        )
    }
}