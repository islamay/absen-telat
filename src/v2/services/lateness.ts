import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url } from '../constants/api'
import type { RootState } from '../redux/store'

export interface ILateness {
    _id: string,
    nis: string,
    guruId: string,
    date: string,
    alasan: Purposes
}

export enum Purposes {
    TidakAda = 'Tidak ada',
    Macet = 'Macet',
    Hujan = 'Hujan',
    KeDokter = 'Ke dokter',
    BanBocor = 'Ban bocor',
    BangunKesiangan = 'Bangun kesiangan',
    MengantarAdikSekolah = 'Mengantar adik ke sekolah',
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
        getLatenesses: builder.query<{ keterlambatan: ILateness[] }, { start: string, end: string }>({
            query: ({ start, end }) => `?start=${start}&end=${end}`,
            providesTags: ['Lateness']
        }),
        getLatenessById: builder.query<ILateness, string>({
            query: (id) => `/${id}`,
            providesTags: ['Lateness']
        }),
        getLatenessByNis: builder.query<ILateness[], { nis: string, page?: number, limit?: number, year: number, month: number }>({
            query: ({ nis, limit = 5, page = 1, month, year }) => `/nis/${nis}?tahun=${year}&bulan=${month}&limit=${limit}&page=${page}`,
            providesTags: ['Lateness']
        }),
        postLateness: builder.mutation<ILateness, { nis: string, purpose: Purposes }>({
            query: ({ nis, purpose }) => ({
                url: '/',
                method: 'POST',
                body: { nis, purpose },
            }),
            invalidatesTags: ['Lateness']
        }),
        patchLatenessPurposeById: builder.mutation<ILateness, { id: string, purpose: string }>({
            query: ({ id, purpose }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: { alasan: purpose }
            }),
            invalidatesTags: ['Lateness']
        })
    }),
})

export const {
    useGetLatenessesQuery,
    useGetLatenessByIdQuery,
    useGetLatenessByNisQuery,
    useLazyGetLatenessByNisQuery,
    usePatchLatenessPurposeByIdMutation,
    usePostLatenessMutation, } = latenessApi
export default latenessApi 