import { createStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import user from './user'
import keterlambatanApi from '../services/keterlambatan'
import dataSiswaApi from '../services/dataSiswa'
import siswaAccountApi from '../services/siswaAccount'

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer,
    [keterlambatanApi.reducerPath]: keterlambatanApi.reducer,
    [dataSiswaApi.reducerPath]: dataSiswaApi.reducer,
    [siswaAccountApi.reducerPath]: siswaAccountApi.reducer
})

export default rootReducer