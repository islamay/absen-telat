import { createSlice } from '@reduxjs/toolkit'
import { restoreAuth, signInGuru, signOut, signUpSiswa, signInSiswa } from './thunks/authThunk'
import { AccStatus, GuruRole, AccType } from '../helpers/accountEnum'


interface AuthState {
    token: string,
    type: AccType | null,
    status: AccStatus | null,
    role: GuruRole | null,
    isAuthenticated: boolean,

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
    isAuthenticated: false,

    isLoading: true,
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
        signOut: (state) => {
            state.token = ''
            state.status = null
            state.type = null
            state.role = null
        }
    },
    extraReducers: builder => {
        builder.addCase(restoreAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.token = action.payload.token
            state.status = action.payload.status
            state.type = action.payload.type

            if (action.payload.type === AccType.GURU) {
                state.role = action.payload.role
            }

        })
        builder.addCase(restoreAuth.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(signInGuru.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signInGuru.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.type = AccType.GURU
            state.token = action.payload.token
            state.status = action.payload.status
            state.role = action.payload.role
        })
        builder.addCase(signInGuru.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.hideError = false
            // @ts-ignore
            state.errorMessage = action.payload.message || action.payload
        })
        builder.addCase(signUpSiswa.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signUpSiswa.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.type = AccType.SISWA
            state.token = action.payload.token
            state.status = action.payload.status
        })
        builder.addCase(signUpSiswa.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signInSiswa.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signInSiswa.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.type = AccType.SISWA
            state.token = action.payload.token
            state.status = action.payload.status
        })
        builder.addCase(signInSiswa.rejected, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signOut.fulfilled, (state, payload) => {
            state.isAuthenticated = false
            state.token = ''
            state.status =
                state.type = null
            state.role = null
        })
    }
})

export default auth