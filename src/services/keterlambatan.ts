import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URI } from '../helpers/env'
import { RootState } from '../store/store'

export interface Keterlambatan {
    _id: string,
    idGuru: string,
    nis: string,
    alasan: string,
    date: Date
}

interface AddKeterlambatanBody {
    nis: string,
    alasan: string
}

const keterlambatan = createApi({
    reducerPath: 'keterlambatan',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getKeterlambatan: builder.query<Keterlambatan[], any>({
            query: () => `/keterlambatan`,
            providesTags: ['Post']
        }),
        getKeterlambatanByNis: builder.query<Keterlambatan[], string>({
            query: (nis) => `/keterlambatan/siswa/${nis}`
        }),
        addKeterlambatan: builder.mutation<Keterlambatan, AddKeterlambatanBody>({
            query: param => ({
                url: '/keterlambatan',
                method: 'POST',
                body: param
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const { useGetKeterlambatanQuery } = keterlambatan
export const { useAddKeterlambatanMutation } = keterlambatan

export default keterlambatan