import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { Axios, AxiosError } from 'axios';
import backendApi, { RejectedResponse } from '../../api/backend';
import { GuruRole, AccStatus } from '../../helpers/accountEnum';
import * as SecureStorage from 'expo-secure-store'
import { AccType } from '../../helpers/accountEnum'

interface SignInPayload {
    email: string,
    password: string
}

interface StudentSignUpPayload extends SignInPayload {
    nis: string
}

interface AuthSuccessResponse {
    email: string,
    namaLengkap: string,
    status: AccStatus,
    token: string
}

interface GuruAuthSuccessResponse extends AuthSuccessResponse {
    role: GuruRole
}

interface StudentAuthSuccess extends AuthSuccessResponse {
    nis: string,
    fullClass: string
}

const authStorageKey = 'auth'

const saveAuthInStorage = async (data: any, accType: AccType) => {
    try {

        const payload: GuruAuthSuccessResponse & StudentAuthSuccess & { type: AccType } = {
            nis: data.nis,
            namaLengkap: data.namaLengkap,
            email: data.email,
            token: data.token,
            type: accType,
            status: data.status,
            role: data.role || '',
            fullClass: data.fullClass || ''
        }

        await SecureStorage.setItemAsync(authStorageKey, JSON.stringify(payload))
    } catch (error) {
        throw error
    }
}

export const signInGuru = createAsyncThunk(
    'auth/signInGuru',
    async (payload: SignInPayload, { rejectWithValue }) => {
        const { email, password } = payload
        try {
            const result = await backendApi.post<GuruAuthSuccessResponse>('/guru/signin', { email, password })
            const data = result.data
            await saveAuthInStorage(data, AccType.GURU)

            return data
        } catch (error) {

            if (axios.isAxiosError(error)) {
                return rejectWithValue((error.response?.data) as RejectedResponse)
            } else {
                return rejectWithValue('Cannot Login')
            }
        }
    }
)

export const signUpSiswa = createAsyncThunk(
    'auth/signUpSiswa',
    async (payload: StudentSignUpPayload, { rejectWithValue }) => {
        try {
            const { nis, email, password } = payload
            const result = await backendApi.post<StudentAuthSuccess>('/user-siswa/signup', { nis, email, password })
            const data = result.data
            await saveAuthInStorage(data, AccType.SISWA)

            return data
        } catch (error) {
            return rejectWithValue('Cannot Signup')
        }
    }
)

export const signInSiswa = createAsyncThunk<StudentAuthSuccess, SignInPayload, { rejectValue: { message: string } }>(
    'auth/signInSiswa',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {
            const { email, password } = payload
            const result = await backendApi.post<StudentAuthSuccess>('/user-siswa/signin', { email, password })
            const data = result.data
            await saveAuthInStorage(data, AccType.SISWA)

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue({ message: error.response?.data.message })
            }
            return rejectWithValue({ message: 'Unexpected Error' })
        }
    }
)



export const restoreAuth = createAsyncThunk(
    'auth/restoreAuth',
    async () => {

        try {
            const rawAuth = await SecureStorage.getItemAsync(authStorageKey)
            if (!rawAuth) throw new Error()
            const auth = JSON.parse(rawAuth) as GuruAuthSuccessResponse & StudentAuthSuccess & { type: AccType }

            return auth
        } catch (error) {
            throw error
        }
    },
    {

    }
)

export const signOut = createAsyncThunk(
    'auth/signout',
    async () => {
        try {
            await SecureStorage.deleteItemAsync(authStorageKey)
        } catch (error) {
            throw error
        }
    }
)