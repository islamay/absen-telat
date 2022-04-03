import { createStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import user from './user'
import keterlambatanApi from '../services/keterlambatan'
import dataSiswaApi from '../services/dataSiswa'

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer,
    [keterlambatanApi.reducerPath]: keterlambatanApi.reducer,
    [dataSiswaApi.reducerPath]: dataSiswaApi.reducer
})

export default rootReducer