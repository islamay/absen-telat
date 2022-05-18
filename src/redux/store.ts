import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth'
import studentSlice from './student'
import latenessApi from '../services/lateness'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import teacherSlice from './teacher'
import studentApi from '../services/student'
import teacherApi from '../services/teacher'

const rootReducer = combineReducers({
    'auth': authSlice.reducer,
    'student': studentSlice.reducer,
    'teacher': teacherSlice.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [latenessApi.reducerPath]: latenessApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(studentApi.middleware)
            .concat(latenessApi.middleware)
            .concat(teacherApi.middleware)
    }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store