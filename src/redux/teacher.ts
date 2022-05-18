import { createSlice } from '@reduxjs/toolkit'
import { AccountStatus, TeacherRole } from '../constants/account'
import { teacherAuthSuccess, teacherSignout } from './authAction'

interface TeacherState {
    id: string,
    nama: string | '',
    email: string | '',
    status: AccountStatus | '',
    role: TeacherRole | '',
}

const initialState: TeacherState = {
    id: '',
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
            state.id = action.payload.guru._id
            state.nama = action.payload.guru.nama
            state.role = action.payload.guru.role
            state.email = action.payload.guru.email
            state.status = action.payload.guru.status
        })
        builder.addCase(teacherSignout, (state) => {
            state.id = ''
            state.nama = ''
            state.email = ''
            state.status = ''
            state.role = ''
        })
    }

})

export default teacherSlice