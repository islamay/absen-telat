import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { backend_url } from '../constants/api'
import type { RootState } from '../redux/store'

export interface Student {
    _id: string,
    nis: string,
    namaLengkap: string,
    kelas: number,
    jurusan: string,
    fullClass: string,
    account: {
        status: string,
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
        baseUrl: backend_url + '/siswa',
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState() as RootState
            headers.append('authorization', 'Bearer ' + auth.token)
            return headers
        },
    }),
    endpoints: builder => ({
        getStudentsByName: builder.query<Student[], StudentFilter>({
            query: ({ name, grade, majors }) => `?${name ? `nama=${name}` : ''}${grade ? `kelas=${grade}` : ''}${majors ? `jurusan=${majors}` : ''}`
        })
    })
})

export const { useGetStudentsByNameQuery, useLazyGetStudentsByNameQuery } = studentApi
export default studentApi