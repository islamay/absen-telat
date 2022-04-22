import { createSlice } from '@reduxjs/toolkit';

interface UserData {
    namaLengkap: string,
    email: string
}

const initialState: UserData = {
    namaLengkap: '',
    email: ''
}

const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        fillData: (state) => {
            state.namaLengkap = 'Dean Prayoga'
            state.email = 'deanprayoga09@gmail.com'
        },
        wipeData: (state) => {
            state.namaLengkap = '',
                state.email = ''
        }
    }
})

export default userData