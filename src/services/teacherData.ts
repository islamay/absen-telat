import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BACKEND_URI } from '../helpers/env'
import { RootState } from '../store/store'

export interface Teacher {
    namaLengkap: string,
    email: string,
    role: string,
    status: string
}

export interface GetTeacherResponse extends Teacher {
    _id: string,
}

export interface AddTeacherBody {
    namaLengkap: string,
    email: string,
    password: string
}

const teacherDataApi = createApi({
    reducerPath: 'teacherData',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token

            headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Teacher'],
    endpoints: builder => ({
        getTeacher: builder.query<GetTeacherResponse[], void>({
            query: () => `/guru`,
            providesTags: ['Teacher']
        }),
        getTeacherByName: builder.query<GetTeacherResponse[], string>({
            query: name => `/guru?nama=${name}`,
            providesTags: ['Teacher']
        }),
        addTeacher: builder.mutation<GetTeacherResponse, AddTeacherBody>({
            query: (body) => ({
                url: '/guru',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Teacher']
        })
    })
})

export const { useGetTeacherQuery, useGetTeacherByNameQuery, useAddTeacherMutation } = teacherDataApi

export default teacherDataApi