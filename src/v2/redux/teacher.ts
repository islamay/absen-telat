import { createSlice } from '@reduxjs/toolkit'
import { AccountStatus, TeacherRole } from '../constants/account'
import { teacherAuthSuccess, teacherSignout } from './authAction'
import { teacherSignIn } from './authThunk'

interface TeacherState {
    nama: string | '',
    email: string | '',
    status: AccountStatus | '',
    role: TeacherRole | '',
}

const initialState: TeacherState = {
    nama: '',
    email: '',
    status: '',
    role: ''
}

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(teacherAuthSuccess, (state, action) => {
            state.nama = action.payload.guru.nama
            state.role = action.payload.guru.role
            state.email = action.payload.guru.email
            state.status = action.payload.guru.status
        })
        builder.addCase(teacherSignout, (state) => {
            state.nama = ''
            state.email = ''
            state.status = ''
            state.role = ''
        })
    }

})

export default teacherSlice