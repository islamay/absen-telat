import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { AccountStatus, EditableAccountStatus, TeacherRole } from '../constants/account'
import { backend_url } from '../constants/api'
import { teacherAuthSuccess, teacherSignout } from '../redux/authAction'
import { RootState } from '../redux/store'

export interface Teacher {
    _id: string,
    nama: string,
    status: AccountStatus,
    email: string,
    role: TeacherRole
}


const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backend_url + '/guru',
        prepareHeaders: (headers, { getState }) => {
            const { auth: { token } } = getState() as RootState
            headers.set('authorization', 'Bearer ' + token)
            return headers
        }
    }),
    tagTypes: ['Teacher'],
    endpoints: builder => ({
        getTeachersByName: builder.query<Teacher[], { name: string }>({
            query: ({ name }) => `?nama=${name}`,
            providesTags: ['Teacher']
        }),
        getTeacherById: builder.query<Teacher, string>({
            query: id => `/${id}`,
            providesTags: ['Teacher']
        }),
        postTeacher: builder.mutation<Teacher, { name: string, email: string }>({
            query: ({ name, email }) => ({
                url: '/',
                method: 'POST',
                body: {
                    nama: name,
                    email,
                }
            }),
            invalidatesTags: ['Teacher']
        }),
        patchTeacher: builder.mutation<Teacher, { id: string, email?: string, role?: TeacherRole, status?: EditableAccountStatus }>({
            query: ({ id, email, role, status }) => {
                const body = {}
                if (!!email) Object.assign(body, { email })
                if (!!role) Object.assign(body, { role })
                if (!!status) Object.assign(body, { status })

                return {
                    url: '/' + id,
                    method: 'PATCH',
                    body
                }
            },
            invalidatesTags: ['Teacher']
        }),
        teacherSignIn: builder.mutation<{ guru: Teacher } & { token: string }, { email: string, password: string }>({
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
                    dispatch(teacherAuthSuccess(data))
                } catch (error) {
                }
            }
        }),
        teacherSignOut: builder.mutation<void, void>({
            query: () => ({
                url: '/signout',
                method: 'DELETE',
            }),
            async onQueryStarted(payload, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(teacherSignout())
                } catch (error) {
                    dispatch(teacherSignout())
                }
            }
        })
    })
})

export const {
    useLazyGetTeachersByNameQuery,
    usePostTeacherMutation,
    usePatchTeacherMutation,
    useGetTeacherByIdQuery,
    useTeacherSignInMutation,
    useTeacherSignOutMutation
} = teacherApi
export default teacherApi