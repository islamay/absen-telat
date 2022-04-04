import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BACKEND_URI } from '../helpers/env'
import { RootState } from '../store/store'
import { ISiswa } from './dataSiswa'

export interface GetSiswaResponse {
    _id: string,
    nis: string,
    email: string,
    status: string,
    siswa: ISiswa
}

const siswaAccountApi = createApi({
    reducerPath: 'siswaAccount',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: builder => ({
        getSiswaAccount: builder.query<GetSiswaResponse[], string>({
            query: (name) => `/user-siswa?nama=${name}`
        })
    })
})

export const { useGetSiswaAccountQuery } = siswaAccountApi

export default siswaAccountApi