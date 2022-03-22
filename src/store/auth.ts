import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    token: string
}

const initialState: AuthState = {
    token: ''
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state) => {
            state.token = 'Bearer Adka0wiorKJWAROKsx0cmxzlASDFOIZ390iLKSMFqew'
        },
        signOut: (state) => {
            state.token = ''
        }
    }
})

export default auth