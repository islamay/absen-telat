import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url } from '../constants/api'
import type { RootState } from '../redux/store'

export interface ILateness {
    _id: string,
    nis: string,
    guruId: string,
    date: string,
    alasan: string
}

export enum Purposes {
    TidakAda = 'Tidak ada',
    BangunTerlambat = 'Bangun terlambat',
    Macet = 'Macet',
    MotorMogok = 'Motor Mogok'
}

const latenessApi = createApi({
    reducerPath: 'latenessApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backend_url + '/keterlambatan',
        prepareHeaders: (headers, { getState }) => {
            const { auth } = getState() as RootState
            headers.append('authorization', 'Bearer ' + auth.token)
            return headers
        },
    }),
    tagTypes: ['Lateness'],
    endpoints: builder => ({
        getLatenessByNis: builder.query<ILateness[], { nis: string, page?: number, limit?: number, year: number, month: number }>({
            query: ({ nis, limit = 5, page = 1, month, year }) => `/${nis}?tahun=${year}&bulan=${month}&limit=${limit}&page=${page}`,
            providesTags: ['Lateness']
        }),
        postLateness: builder.mutation<ILateness, { nis: string }>({
            query: ({ nis }) => ({
                url: '/',
                method: 'POST',
                body: { nis }
            })
        }),
        patchLatenessPurposeByIdP: builder.mutation<ILateness, { id: string, purpose: string }>({
            query: ({ id, purpose }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: { alasan: purpose }
            }),
            invalidatesTags: ['Lateness']
        })
    }),
})

export const { useGetLatenessByNisQuery, useLazyGetLatenessByNisQuery, usePatchLatenessPurposeByIdPMutation, usePostLatenessMutation } = latenessApi
export default latenessApi 