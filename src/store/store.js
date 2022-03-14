import { createStore, combineReducers } from 'redux'
import authReducer from './authReducer'
import userDataReducer from './userDataReducer'

const rootReducer = combineReducers({
    authReducer,
    userDataReducer
})

const store = createStore(rootReducer)

export default store