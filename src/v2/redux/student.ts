import { createSlice } from '@reduxjs/toolkit'
import { studentSignIn, studentSignOut } from './authThunk'

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
        builder.addCase(studentSignIn.fulfilled, (state, action) => {
            state.nis = action.payload.siswa.nis
            state.name = action.payload.siswa.namaLengkap
            state.fullClass = action.payload.siswa.fullClass
            state.email = action.payload.siswa.account.email
        })
        builder.addCase(studentSignOut.fulfilled, (state) => {
            state.nis = ''
            state.name = ''
            state.fullClass = ''
            state.email = ''
        })
        builder.addCase(studentSignOut.rejected, (state) => {
            state.nis = ''
            state.name = ''
            state.fullClass = ''
            state.email = ''
        })
    }
})

export default studentSlice
