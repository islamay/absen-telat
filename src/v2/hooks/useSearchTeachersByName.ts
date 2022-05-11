import { useState } from 'react'
import useDebounce from './useDebounce'
import sleep from '../utils/sleep'
import { Teacher, useLazyGetTeachersByNameQuery } from '../services/teacher'


const useSearchTeachersByName = (query: string) => {
    const [fetchTeachers] = useLazyGetTeachersByNameQuery()
    const [isLoading, setIsLoading] = useState(false)
    const [teachers, setTeachers] = useState<Teacher[]>([])

    useDebounce(() => {
        (async () => {
            setIsLoading(true)
            const fetching = fetchTeachers({ name: query })
            await sleep(500)
            const result = await fetching
            setIsLoading(false)
            setTeachers(result.data || [])
        })()
    }, 200, [query])

    return { isLoading, teachers }
}

export default useSearchTeachersByName

