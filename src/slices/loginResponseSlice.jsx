import { createSlice } from '@reduxjs/toolkit'

export const loginResponseSlice = createSlice({
    name: 'loginresponse',
    initialState: {
        mensagem:{msg: '', count: 0},
        tipoMensagem: '',
        content:{id: "", name: "", userName: "", isManager: false},
    },
    reducers: {
        setMensagem: (state, action) => {
            state.mensagem = action.payload;
        },
        setTipoMensagem: (state, action) => {
            state.tipoMensagem = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        cleanMsgEtipoMsg: (state) => {
            state.mensagem = {msg: "", count: 0}
            state.tipoMensagem = ""
        },
        cleanContent: (state) => {
            state.content = {id: "", name: "", userName: "", isManager: false}
        }
    },
})

export const {
    setMensagem,
    setTipoMensagem,
    setContent,
    cleanMsgEtipoMsg,
    cleanContent}= loginResponseSlice.actions
    
export default loginResponseSlice.reducer