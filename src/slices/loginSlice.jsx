import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        cliente:'',
        usuario:'',
        senha:'',
    },
    reducers: {
        setCliente: (state, action) => {
            state.cliente = action.payload;
        },
        setUsuario: (state, action) => {
            state.usuario = action.payload;
        },
        setSenha: (state, action) => {
            state.senha = action.payload;
        },
        cleanSenha: (state) => {
            state.senha = ""
        }
    },
})

export const {
    setCliente,
    setUsuario,
    setSenha,
    cleanSenha}= loginSlice.actions
    
export default loginSlice.reducer