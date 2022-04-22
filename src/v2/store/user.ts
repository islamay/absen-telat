import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth from './auth'
import { signInGuru, signInSiswa, restoreAuth, } from './thunks/authThunk'
import { AccType } from '../helpers/accountEnum'

interface User {
    namaLengkap: string,
    email: string,
    type: AccType | '',
    role: string,
    fullClass: string,
    nis: string,
    status: string
}

const initialState: User = {
    namaLengkap: '',
    email: '',
    type: '',
    role: '',
    fullClass: '',
    nis: '',
    status: ''
}



export const restoreUser = createAsyncThunk(
    'user/restore',
    async (type: string) => {

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
            .addCase(signInGuru.fulfilled, (state, action) => {
                state.namaLengkap = action.payload.namaLengkap
                state.email = action.payload.email
                state.role = action.payload.role
                state.status = action.payload.status
                state.type = AccType.GURU
            })
            .addCase(signInSiswa.fulfilled, (state, action) => {
                state.nis = action.payload.nis
                state.namaLengkap = action.payload.namaLengkap
                state.email = action.payload.email
                state.status = action.payload.status
                state.fullClass = action.payload.fullClass
                state.type = AccType.SISWA
            })
            .addCase(restoreAuth.fulfilled, (state, action) => {
                state.nis = action.payload.nis
                state.namaLengkap = action.payload.namaLengkap
                state.email = action.payload.email
                state.role = action.payload.role
                state.fullClass = action.payload.fullClass
                state.status = action.payload.status
                state.type = action.payload.type
            })
    }
})

export default user