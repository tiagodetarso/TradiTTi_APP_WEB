const agora = new Date()

export const promotionTableColumns = [
    {
        id:'subType',
        name:"Tipo",
        selector: row => row.subType,
        sortable: true,
        width: '12%'
        
    },
    {
        id:'specification',
        name:"Sabor",
        selector: row => row.specification,
        sortable: true,
        width: '17%'
    },
    {
        id:'unity',
        name:"Und",
        selector: row => row.unity,
        sortable: true,
        width: '13%'
    },
    {
        id:'promotionValue',
        name:"Preço",
        selector: row => `R$ ${row.promotionValue.toFixed(2)}`,
        sortable: true,
        width: '12%'
    },
    {
        id:'fixPromotionDay',
        name:"Dia",
        selector: row => row.fixPromotionDay === 'Nenhum dia específico' ? '-' : row.fixPromotionDay,
        sortable: true,
        width: '15%'
    },
    {
        id:'promotionInitialDate',
        name:"Início",
        selector: row => (new Date(row.promotionFinalDate)>agora) ? row.promotionInitialDate: "-",
        sortable: true,
        width: '13%'
    },
    {
        id:'promotionFinalDate',
        name:"Final",
        selector: row => (new Date(row.promotionFinalDate)>agora) ? row.promotionFinalDate: "-",
        sortable: true,
        width: '13%'
    },
]