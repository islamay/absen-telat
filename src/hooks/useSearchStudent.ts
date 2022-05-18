import { useState } from 'react'
import useDebounce from './useDebounce'
import { useLazyGetStudentsByNameQuery, Student } from '../services/student'
import sleep from '../utils/sleep'

const useSearchStudent = (query: string) => {
    const [fetchStudent] = useLazyGetStudentsByNameQuery()
    const [isLoading, setIsLoading] = useState(false)
    const [students, setStudents] = useState<Student[]>([])

    useDebounce(() => {
        (async () => {
            setIsLoading(true)
            const fetching = fetchStudent({ name: query })
            await sleep(500)
            const result = await fetching
            setIsLoading(false)
            setStudents(result.data || [])
        })()
    }, 200, [query])

    const refetch = () => {
        fetchStudent({ name: query })
    }

    return { isLoading, students, refetch }
}

export default useSearchStudent

