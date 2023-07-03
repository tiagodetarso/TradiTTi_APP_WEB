import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice'
import loginResponseReducer from '../slices/loginResponseSlice'
import retrieveReducer from '../slices/retrieveSlice'
import productReducer from '../slices/productSlice'
import locationReducer from '../slices/locationSlice'

export default configureStore({
    reducer: {
        login: loginReducer,
        loginresponse: loginResponseReducer,
        retrieve: retrieveReducer,
        product: productReducer,
        location: locationReducer,
    }
})
