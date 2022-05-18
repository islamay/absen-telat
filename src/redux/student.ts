import { createSlice } from '@reduxjs/toolkit'
import { studentAuthSuccess, studentSignout } from './authAction'

interface Student {
    nis: string | '',
    name: string | '',
    email: string | ''
    fullClass: string | ''
}

const initialState: Student = {
    nis: '',
    name: '',
    email: '',
    fullClass: ''
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(studentAuthSuccess, (state, action) => {
            state.nis = action.payload.siswa.nis
            state.name = action.payload.siswa.namaLengkap
            state.email = action.payload.siswa.account.email
            state.fullClass = action.payload.siswa.fullClass
        })
        builder.addCase(studentSignout, (state, action) => {
            state.nis = ''
            state.name = ''
            state.email = ''
            state.fullClass = ''
        })
    }
})

export default studentSlice
