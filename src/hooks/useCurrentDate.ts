import { useRef, useState, useMemo } from 'react'
import { endOfMonth } from '../utils/date'

const useCurrentDate = () => {
    const currentDate = useRef(new Date())
    const [year, setYear] = useState(currentDate.current.getFullYear())
    const [month, setMonth] = useState(currentDate.current.getMonth())
    const [date, setDate] = useState(currentDate.current.getDate())
    const [week, setWeek] = useState(Math.ceil(date / 7))

    const dateObject = useMemo(() => {
        return new Date(year, month, date)
    }, [date, month, year])

    return { year, month, week, date, setYear, setMonth, setWeek, setDate, dateObject }
}

export default useCurrentDate