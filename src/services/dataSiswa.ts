import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URI } from '../helpers/env'
import { RootState } from '../store/store'

export interface ISiswa {
    _id: string,
    nis: string,
    namaLengkap: string,
    kelas: number,
    kelasString: string,
    kelasNo: number,
    jurusan: string,
    fullClass: string
}

const dataSiswaApi = createApi({
    reducerPath: 'siswa',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        },
    }),
    endpoints: (builder) => ({
        getSiswaByName: builder.query<ISiswa[], string>({
            query: (name) => `/data-siswa/?name=${name}`
        })
    })
})

export const { useGetSiswaByNameQuery } = dataSiswaApi

export default dataSiswaApi