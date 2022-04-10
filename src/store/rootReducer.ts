import { createStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import user from './user'
import keterlambatanApi from '../services/keterlambatan'
import dataSiswaApi from '../services/dataSiswa'
import siswaAccountApi from '../services/siswaAccount'
import teacherDataApi from '../services/teacherData'

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer,
    [keterlambatanApi.reducerPath]: keterlambatanApi.reducer,
    [dataSiswaApi.reducerPath]: dataSiswaApi.reducer,
    [siswaAccountApi.reducerPath]: siswaAccountApi.reducer,
    [teacherDataApi.reducerPath]: teacherDataApi.reducer
})

export default rootReducer