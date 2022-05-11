import { createSlice } from '@reduxjs/toolkit/'
import { AccountType, AccountStatus, TeacherRole } from '../constants/account'
import { studentAuthSuccess, studentSignout, teacherAuthSuccess, teacherSignout } from './authAction'

interface AuthState {
    type: AccountType | '',
    token: string,
    status: AccountStatus | '',
    role: TeacherRole | '',
    isAuthenticated: boolean,
}

const initialState: AuthState = {
    type: '',
    token: '',
    status: '',
    role: '',
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(teacherAuthSuccess, (state, action) => {
            state.isAuthenticated = true
            state.type = AccountType.GURU
            state.token = action.payload.token
            state.role = action.payload.guru.role
            state.status = action.payload.guru.status
        })
        builder.addCase(teacherSignout, state => {
            state.isAuthenticated = false
            state.type = ''
            state.token = ''
            state.status = ''
            state.role = ''
        })
        builder.addCase(studentAuthSuccess, (state, action) => {
            state.isAuthenticated = true
            state.type = AccountType.SISWA
            state.token = action.payload.token
            state.role = ''
            state.status = action.payload.siswa.account.status
        })
        builder.addCase(studentSignout, state => {
            state.isAuthenticated = false
            state.type = ''
            state.token = ''
            state.status = ''
            state.role = ''
        })
    }
})

export const { } = authSlice.actions
export default authSlice