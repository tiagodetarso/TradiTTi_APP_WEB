import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        path:'',
    },
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
        },
        cleanPath: (state) => {
            state.path = ""
        }
    },
})

export const {
    setPath,
    cleanPath}= locationSlice.actions
    
export default locationSlice.reducer