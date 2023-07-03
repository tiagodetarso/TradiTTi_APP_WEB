export const productTableColumns = [
    {
        id:'type',
        name:"Tipo",
        selector: row => row.type,
        sortable: true,
        width: '15%'
    },
    {
        id:'subType',
        name:"Grupo",
        selector: row => row.subType,
        sortable: true,
        width: '15%'
        
    },
    {
        id:'specification',
        name:"Especificação",
        selector: row => row.specification,
        sortable: true,
        width: '30%'
    },
    {
        id:'unity',
        name:"Und",
        selector: row => row.unity,
        sortable: true,
        width: '15%'
    },
    {
        id:'value',
        name:"Preço",
        selector: row => `R$ ${row.value.toFixed(2)}`,
        sortable: true,
        width: '15%'
    },
]