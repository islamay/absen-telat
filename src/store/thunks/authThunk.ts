import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import backendApi, { RejectedResponse } from '../../api/backend';
import { GuruRole, AccStatus } from '../../helpers/accountEnum';
import * as SecureStorage from 'expo-secure-store'
import { AccType } from '../../helpers/accountEnum'

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

const authStorageKey = 'auth'

const saveAuthInStorage = async (data: GuruAuthSuccessResponse, accType: AccType) => {
    try {
        const payload = { token: data.token, type: accType, status: data.status, role: data.role }
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
            const result = await backendApi.post('/guru/signin', { email, password })
            const data = result.data as GuruAuthSuccessResponse
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

export const signInSiswa = createAsyncThunk(
    'auth/signInSiswa',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {

        } catch (error) {

        }
    }
)



export const restoreAuth = createAsyncThunk(
    'auth/restoreAuth',
    async () => {
        try {
            const rawAuth = await SecureStorage.getItemAsync(authStorageKey)
            if (!rawAuth) throw new Error()

            const auth = JSON.parse(rawAuth)
            return auth as { token: string, type: AccType, status: AccStatus, role: GuruRole }

        } catch (error) {
            throw error
        }
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