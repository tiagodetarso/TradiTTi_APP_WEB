import { createSlice } from '@reduxjs/toolkit'

export const retrieveSlice = createSlice({
    name: 'retrieve',
    initialState: {
        clientNumber: '',
        userName: '',
    },
    reducers: {
        setClientNumber: (state, action) => {
            state.clientNumber = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
})

export const {setClientNumber, setUserName}= retrieveSlice.actions
    
export default retrieveSlice.reducer