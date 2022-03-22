import { createStore, combineReducers } from 'redux'
import auth from './auth'
import user from './user'

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer
})

const store = createStore(rootReducer)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch