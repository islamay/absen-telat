import { createStore, combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import user from './user'

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer
})

export default rootReducer