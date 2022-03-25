import { createSlice } from '@reduxjs/toolkit'
import { signInGuru } from './thunks/authThunk'
import { AccStatus, GuruRole, AccType } from '../helpers/accountEnum'


interface AuthState {
    token: string,
    type: AccType | null,
    status: AccStatus | null,
    role: GuruRole | null,

    isLoading: boolean,
    isError: boolean,
    hideError: boolean,
    errorMessage: string,
}

const initialState: AuthState = {
    token: '',
    status: null,
    type: null,
    role: null,

    isLoading: false,
    isError: false,
    hideError: true,
    errorMessage: ''
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        hideError: (state) => {
            state.hideError = true
        },
        signInGuru: (state) => {
            state.token = 'Bearer Adka0wiorKJWAROKsx0cmxzlASDFOIZ390iLKSMFqew'
            state.status = AccStatus.AKTIF
            state.type = AccType.GURU
            state.role = GuruRole.ADMIN
        },
        signInSiswa: (state) => {
            state.token = 'Bearer Adka0wiorKJWAROKsx0cmxzlASDFOIZ390iLKSMFqew'
            state.status = AccStatus.AKTIF
            state.type = AccType.SISWA
        },
        signOut: (state) => {
            state.token = ''
            state.status = null
            state.type = null
            state.role = null
        }
    },
    extraReducers: builder => {
        builder.addCase(signInGuru.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(signInGuru.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.token
            state.status = action.payload.status
            state.role = action.payload.role
        })
        builder.addCase(signInGuru.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.hideError = false
            state.errorMessage = 'Failed To Login'
        })
    }
})

export default auth