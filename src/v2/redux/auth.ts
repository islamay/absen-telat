import { InitialState } from '@react-navigation/native'
import { createSlice } from '@reduxjs/toolkit/'
import { AccountType, AccountStatus, TeacherRole } from '../constants/account'
import { studentSignIn, studentSignOut, studentSignUp, teacherSignIn, teacherSignOut } from './authThunk'

interface AuthState {
    type: AccountType | '',
    token: string,
    status: AccountStatus | '',
    role: TeacherRole | '',
    isAuthenticated: boolean,

    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

const initialState: AuthState = {
    type: '',
    token: '',
    status: '',
    role: '',
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    errorMessage: ''
}

const resetAuthState = (state: AuthState) => {
    state.type = ''
    state.token = ''
    state.status = ''
    state.role = ''
    state.isAuthenticated = false
    state.isLoading = false
    state.isError = false
    state.errorMessage = ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthError: (state) => {
            state.isError = false
            state.errorMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(studentSignIn.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(studentSignIn.fulfilled, (state, action) => {

            state.isAuthenticated = true
            state.isLoading = false
            state.status = action.payload.siswa.account.status
            state.token = action.payload.token
            state.type = AccountType.SISWA
        })
        builder.addCase(studentSignUp.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(studentSignUp.fulfilled, (state) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = 'Berhasil mendaftar, harap hubungi admin untuk mengaktifkan akun'
        })
        builder.addCase(studentSignUp.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload?.message || 'Server error, harap coba lagi nanti'
        })
        builder.addCase(studentSignIn.rejected, (state, action) => {
            state.isAuthenticated = false
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload?.message || 'Server error, harap coba lagi nanti'
        })
        builder.addCase(studentSignOut.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(studentSignOut.fulfilled, (state) => {
            state.isAuthenticated = false
            state.isLoading = false
            state.token = ''
            state.type = ''
        })
        builder.addCase(studentSignOut.rejected, (state) => {
            state.isAuthenticated = false
            state.isLoading = false
            state.token = ''
            state.type = ''
        })
        builder.addCase(teacherSignIn.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(teacherSignIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.token = action.payload.token
            state.type = AccountType.GURU
            state.role = action.payload.guru.role
        })
        builder.addCase(teacherSignIn.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (action.payload) state.errorMessage = action.payload.message
            else state.errorMessage = 'Server error, harap coba lagi nanti'
        })
        builder.addCase(teacherSignOut.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(teacherSignOut.fulfilled, (state) => {
            resetAuthState(state)
        })
        builder.addCase(teacherSignOut.rejected, (state) => {
            resetAuthState(state)
        })


    }
})

export const { resetAuthError } = authSlice.actions
export default authSlice