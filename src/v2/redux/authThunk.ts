import { createAsyncThunk } from '@reduxjs/toolkit'
import { AccountStatus, AccountType, TeacherRole } from '../constants/account'
import { backend_url, ErrorResponse } from '../constants/api'
import axios, { AxiosError } from 'axios'
import sleep from '../utils/sleep'
import type { RootState } from './store'
import backendApi from '../utils/backend'

interface SignInPayload {
    email: string,
    password: string
}

interface SignUpPayload {
    nis: string,
    email: string,
    password: string
}

interface SuccessTeacherLoginResponse {
    guru: {
        nama: string,
        email: string,
        status: AccountStatus,
        role: TeacherRole
    },
    token: string
}

interface SuccessStudentLoginResponse {
    siswa: {
        nis: string,
        namaLengkap: string,
        fullClass: string,
        account: {
            email: string,
            status: AccountStatus
        },
    },
    token: string
}

const errorExtractor = (error: any): ErrorResponse => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return (error.response.data as ErrorResponse)
        } else if (error.request) {
            return { name: 'NetworkError', message: 'Periksa lagi koneksi internet antum' }
        } else {
            return { name: 'UnknownError', message: 'Error tidak diketahui, coba lagi nanti' }
        }
    } else {
        return { name: 'UnknownError', message: 'Error tidak diketahui, coba lagi nanti' }
    }
}

export const studentSignUp = createAsyncThunk<void, SignUpPayload, { rejectValue: ErrorResponse }>(
    'auth/studentSignUp',
    async (payload, { rejectWithValue }) => {
        try {
            const { email = '', nis = '', password = '' } = payload
            const signignUp = axios.post<void>(backend_url + '/siswa/signup', { nis, email, password })
            await sleep(1000)
            await signignUp
            return;
        } catch (error: any) {
            const errorResponse = errorExtractor(error)
            return rejectWithValue(errorResponse)
        }
    }
)

export const studentSignIn = createAsyncThunk<SuccessStudentLoginResponse, SignInPayload, { rejectValue: ErrorResponse }>(
    'auth/studentSignIn',
    async (payload, { rejectWithValue }) => {
        try {
            const { email = '', password = '' } = payload
            const authenticating = backendApi.post('/siswa/signin', { email, password })
            await sleep(1000)
            const response = await authenticating

            return response.data

        } catch (error: any) {
            const errorResponse = errorExtractor(error)
            return rejectWithValue(errorResponse)
        }
    }
)

export const studentSignOut = createAsyncThunk<void, void, { state: RootState, rejectValue: ErrorResponse }>(
    'auth/studentSignOut',
    async (payload, { getState, rejectWithValue }) => {
        const { student, auth: { token } } = getState()
        try {
            const signingOut = backendApi.delete(backend_url + `/siswa/${student.nis}/signout`, { headers: { 'authorization': token } })
            await sleep(1000)
            await signingOut
            return;
        } catch (error) {
            const errorResponse = errorExtractor(error)
            return rejectWithValue(errorResponse)
        }
    }
)

export const teacherSignIn = createAsyncThunk<SuccessTeacherLoginResponse, SignInPayload, { rejectValue: ErrorResponse }>(
    'auth/teacherSignIn',
    async (payload, { rejectWithValue }) => {
        try {
            const authenticating = axios.post<SuccessTeacherLoginResponse>(backend_url + '/guru/signin', payload)
            await sleep(1000)
            const response = await authenticating
            return response.data
        } catch (error) {
            const errorResponse = errorExtractor(error)
            return rejectWithValue(errorResponse)
        }
    }
)

export const teacherSignOut = createAsyncThunk<void, void, { state: RootState }>(
    'auth/teacherSignOut',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { auth: { token } } = getState()

            const loggingOut = axios.post(backend_url + '/guru/signout', {}, { headers: { authorization: token } })
            await sleep(1000)
            await loggingOut
            return
        } catch (error) {
            const errorResponse = errorExtractor(error)
            return rejectWithValue(errorResponse)
        }
    }
)