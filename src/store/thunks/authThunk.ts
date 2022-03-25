import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import backendApi, { RejectedResponse } from '../../api/backend';
import { GuruRole, AccStatus } from '../../helpers/accountEnum';


interface SignInPayload {
    email: string,
    password: string
}

interface GuruAuthSuccessResponse {
    email: string,
    namaLengkap: string,
    role: GuruRole,
    status: AccStatus,
    token: string
}

interface SiswaAuthSuccessResponse {

}

export const signInGuru = createAsyncThunk(
    'auth/signInGuru',
    async (payload: SignInPayload, { rejectWithValue }) => {
        const { email, password } = payload
        try {
            const result = await backendApi.post('/guru/signin', { email, password })
            return result.data as GuruAuthSuccessResponse
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue((error.response?.data) as RejectedResponse)
            }
            throw error
        }
    }
)

export const signInSiswa = createAsyncThunk(
    'auth/signInSiswa',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {

        } catch (error) {

        }
    }
)