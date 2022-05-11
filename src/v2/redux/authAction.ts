import { createAction } from '@reduxjs/toolkit'
import type { Student } from '../services/student'
import type { Teacher } from '../services/teacher'

export const teacherAuthSuccess = createAction<{ guru: Teacher } & { token: string }>('auth/teacher/signin')
export const teacherSignout = createAction<void>('auth/teacher/signout')
export const studentAuthSuccess = createAction<{ siswa: Student } & { token: string }>('auth/student/signin')
export const studentSignout = createAction<void>('auth/student/signout')