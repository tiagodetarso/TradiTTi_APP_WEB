import LillButton from '../formItens/LillButton'

const apiUrl = process.env.REACT_APP_API_URL

function ChangeThereIs (r) {
    fetch (`http://${apiUrl}/product/editthereis`, {
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