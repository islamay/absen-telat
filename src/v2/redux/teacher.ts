import { createSlice } from '@reduxjs/toolkit'
import { AccountStatus, TeacherRole } from '../constants/account'
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
        builder.addCase(teacherSignIn.fulfilled, (state, action) => {
            state.nama = action.payload.guru.nama
            state.email = action.payload.guru.email
            state.status = action.payload.guru.status
            state.role = action.payload.guru.role
        })
    }

})

export default teacherSlice