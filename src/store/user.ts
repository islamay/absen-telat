import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth from './auth'

interface User {
    namaLengkap: string,
    email: string,
    isWaiting: boolean | null
}

const initialState: User = {
    namaLengkap: '',
    email: '',
    isWaiting: null
}

const signinGuru = createAsyncThunk(
    'user/guruLogin',
    async () => {

    }
)

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(auth.actions.signOut, (state) => {
                state.namaLengkap = ''
                state.email = ''
                state.isWaiting = null
            })
            .addCase(auth.actions.signIn, (state) => {
                state.namaLengkap = 'Dean Prayoga'
                state.email = 'deanprayoga09@gmail.com'
                state.isWaiting = false
            })
    }
})

export default user