import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        type: '',
        subType: '',
        specification: '',
        subSpecification: '',
        unity: '',
        value: 0,
        promotionValue: 0,
        fixPromotionDay: 0,
        promotionInitialDate: '',
        promotionFinalDate: '',
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
        setSubType: (state, action) => {
            state.subType = action.payload;
        },
        setSpecification: (state, action) => {
            state.Specification = action.payload;
        },
        setSubSpecification: (state, action) => {
            state.subSpecification = action.payload;
        },
        setUnity: (state, action) => {
            state.unity = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setPromotionValue: (state, action) => {
            state.promotionValue = action.payload;
        },
        setFixPromotionDay: (state, action) => {
            state.fixPromotionDay = action.payload;
        },
        setPromotionInitialDate: (state, action) => {
            state.promotionInitialDate = action.payload;
        },
        setPromotionFinalDate: (state, action) => {
            state.promotionFinalDate = action.payload;
        },
    }
})

export const {
    setType,
    setSubType,
    setSpecification,
    setSubSpecification,
    setUnity,
    setValue,
    setPromotionValue,
    setFixPromotionDaym,
    setPromotionInitialDate,
    setPromotionFinalDate
    }= productSlice.actions
    
export default productSlice.reducer