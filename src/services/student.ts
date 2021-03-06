import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { AccountStatus } from '../constants/account'
import Constant from 'expo-constants'
import { studentAuthSuccess, studentSignout } from '../redux/authAction'
import type { RootState } from '../redux/store'
import * as SecureStorage from 'expo-secure-store'

export enum Majors {
    RPL = 'RPL',
    TKJ = 'TKJ',
    TKR = 'TKR',
    TAB = 'TAB',
    TAV = 'TAV',
    TITL = 'TITL',
    DPIB = 'DPIB'
}

export interface Student {
    _id: string,
    nis: string,
    namaLengkap: string,
    kelas: number,
    jurusan: string,
    fullClass: string,
    account: {
        status: AccountStatus,
        email: string
    }
}

export interface StudentFilter {
    name?: string,
    grade?: number[],
    majors?: string[]
}

const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Constant.manifest?.extra?.backend_url + '/siswa',
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState() as RootState

            headers.append('authorization', 'Bearer ' + auth.token)
            return headers
        },
    }),
    tagTypes: ['Student'],
    endpoints: builder => ({
        getStudentsByName: builder.query<Student[], StudentFilter>({
            query: ({ name, grade, majors }) => `?${name ? `nama=${name}` : ''}${grade ? `kelas=${grade}` : ''}${majors ? `jurusan=${majors}` : ''}`,
            providesTags: ['Student']
        }),
        getStudentByNis: builder.query<Student, string>({
            query: (nis) => `/${nis}`,
            providesTags: ['Student']
        }),
        postStudent: builder.mutation<Student, { nis: string, name: string, email?: string, grade: number, gradeNo: number, major: Majors, }>({
            query: ({ nis, name, email, grade, gradeNo, major }) => {
                const body = {
                    nis,
                    namaLengkap: name,
                    kelas: grade,
                    kelasNo: gradeNo,
                    jurusan: major
                }
                if (body) Object.assign(body, { email })

                return {
                    url: '',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['Student']
        }),
        patchStudent: builder.mutation<Student, { nis: string, email?: string, status?: AccountStatus }>({
            query: ({ nis, email = undefined, status = undefined }) => {
                const body = {}
                if (email) Object.assign(body, { email })
                if (status) Object.assign(body, { status })
                return {
                    url: '/' + nis,
                    method: 'PATCH',
                    body
                }
            },
            invalidatesTags: ['Student']
        }),
        requestChangePassword: builder.mutation<{ message: 'Success' }, { email: string }>({
            query: ({ email }) => {
                return {
                    url: '/request-change-password',
                    method: 'POST',
                    body: {
                        email
                    }
                }
            }
        }),
        changePassword: builder.mutation<{ siswa: Student, token: string }, {
            id: string,
            oldPassword: string,
            newPassword: string
        }>({
            query: ({ id, oldPassword, newPassword }) => ({
                url: '/' + id + '/password',
                method: 'PUT',
                body: {
                    oldPassword,
                    newPassword
                }
            }),
            onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(studentAuthSuccess(data))
                } catch (error) {
                }
            }
        }),
        studentSignIn: builder.mutation<{ siswa: Student } & { token: string }, { email: string, password: string }>({
            query: ({ email, password }) => ({
                url: '/signin',
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled
                    await SecureStorage.setItemAsync('student', JSON.stringify([data.siswa, data.token]))
                    dispatch(studentAuthSuccess(data))
                } catch (error) {
                }
            },
        }),
        studentSignUp: builder.mutation<void, { nis: string, email: string, password: string }>({
            query: ({ nis, email, password }) => ({
                url: '/signup',
                method: 'POST',
                body: {
                    nis,
                    email,
                    password
                }
            })
        }),
        studentSignOut: builder.mutation<void, void>({
            query: () => ({
                url: '/signout',
                method: 'DELETE',
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    await SecureStorage.deleteItemAsync('student')
                    await queryFulfilled
                    dispatch(studentSignout())
                } catch (error) {
                    dispatch(studentSignout())
                }
            }
        })
    })
})

export const {
    useGetStudentsByNameQuery,
    useLazyGetStudentsByNameQuery,
    useGetStudentByNisQuery,
    useLazyGetStudentByNisQuery,
    usePostStudentMutation,
    usePatchStudentMutation,
    useStudentSignInMutation,
    useStudentSignUpMutation,
    useStudentSignOutMutation,
    useChangePasswordMutation,
    useRequestChangePasswordMutation,
} = studentApi
export default studentApi