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

type IAddSiswa = Omit<ISiswa, '_id' | 'kelasString' | 'fullClass'>;

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
    tagTypes: ['Siswa'],
    endpoints: (builder) => ({
        getSiswaByName: builder.query<ISiswa[], string>({
            query: (name) => `/data-siswa/?name=${name}`,
            providesTags: ['Siswa']
        }),
        addSiswa: builder.mutation<ISiswa, IAddSiswa>({
            query: (siswa) => ({
                url: '/data-siswa',
                body: siswa,
                method: 'POST'
            }),
            invalidatesTags: ['Siswa']
        })
    })
})

export const { useGetSiswaByNameQuery, useAddSiswaMutation } = dataSiswaApi

export default dataSiswaApi