import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import keterlamabatanApi from '../services/keterlambatan'
import dataSiswaApi from '../services/dataSiswa'
import siswaAccountApi from '../services/siswaAccount'
import teacherDataApi from '../services/teacherData'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(keterlamabatanApi.middleware)
            .concat(dataSiswaApi.middleware)
            .concat(siswaAccountApi.middleware)
            .concat(teacherDataApi.middleware)
    }
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch