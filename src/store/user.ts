import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth from './auth'

interface User {
    namaLengkap: string,
    email: string
}

const initialState: User = {
    namaLengkap: '',
    email: ''
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
            })
            .addCase(auth.actions.signInGuru, (state) => {
                state.namaLengkap = 'Dean Prayoga'
                state.email = 'deanprayoga09@gmail.com'
            })
            .addCase(auth.actions.signInSiswa, (state) => {
                state.namaLengkap = 'Muhammad Ilham Alfarisi'
                state.email = 'deanprayoga09@gmail.com'
            })
    }
})

export default user