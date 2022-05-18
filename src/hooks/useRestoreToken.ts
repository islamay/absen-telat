import { useEffect, useState } from 'react'
import { studentAuthSuccess, teacherAuthSuccess } from '../redux/authAction'
import { useAppDispatch } from './redux'
import * as SecureStorage from 'expo-secure-store'
import { Student } from '../services/student'
import { Teacher } from '../services/teacher'
import axios from 'axios'
import Constant from 'expo-constants'
import * as Network from 'expo-network'

const restoreTeacherData = async (): Promise<{ teacher: Teacher, token: string } | false> => {
    try {
        const { isInternetReachable } = await Network.getNetworkStateAsync()
        const result = await SecureStorage.getItemAsync('teacher')
        if (!result) return false
        const [savedData, token] = JSON.parse(result) as [Teacher, string]
        if (!savedData._id) return false
        if (isInternetReachable) {
            const teacher = await axios.get<Teacher>(Constant.manifest?.extra?.backend_url + '/guru/' + savedData._id, { headers: { authorization: 'Bearer ' + token } })
            return { teacher: teacher.data, token };
        }
        return { teacher: savedData, token }
    } catch (error) {
        return false
    }
}

const restoreStudentData = async (): Promise<{ student: Student, token: string } | false> => {
    try {
        const { isInternetReachable } = await Network.getNetworkStateAsync()
        const result = await SecureStorage.getItemAsync('student')
        if (!result) return false
        const [savedData, token] = JSON.parse(result) as [Student, string]
        if (!savedData.nis) return false
        if (isInternetReachable) {
            const student = await axios.get<Student>(Constant.manifest?.extra?.backend_url + '/siswa' + savedData.nis, { headers: { authorization: 'Bearer ' + token } })
            return { student: student.data, token };
        }
        return { student: savedData, token }
    } catch (error) {
        return false
    }
}

const useRestoreToken = () => {
    const [isDone, setIsDone] = useState(false)
    const dispatch = useAppDispatch()

    const done = () => {
        setIsDone(true)
    }

    useEffect(() => {
        (async () => {
            try {
                const restoreStudentResult = await restoreStudentData()
                if (restoreStudentResult) {
                    dispatch(studentAuthSuccess({ siswa: restoreStudentResult.student, token: restoreStudentResult.token }))
                    return done()
                }

                const restoreTeacherResult = await restoreTeacherData()
                if (restoreTeacherResult) {
                    dispatch(teacherAuthSuccess({ guru: restoreTeacherResult.teacher, token: restoreTeacherResult.token }))
                    return done()
                }
            } catch (error) {

            }

            return done()
        })()
    }, [])

    return isDone
}

export default useRestoreToken