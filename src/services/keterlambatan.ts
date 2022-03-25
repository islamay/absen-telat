import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URI } from '../helpers/env'
import { RootState } from '../store/store'

interface Keterlambatan {
    _id: string,
    idGuru: string,
    nis: string,
    alasan: string,
    date: Date
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
    endpoints: (builder) => ({
        getKeterlambatan: builder.query<Keterlambatan[], void>({
            query: () => `/keterlambatan`,

        }),
        getKeterlambatanByNis: builder.query<Keterlambatan[], string>({
            query: (nis) => `/keterlambatan/siswa/${nis}`
        })
    })
})

export default keterlambatan