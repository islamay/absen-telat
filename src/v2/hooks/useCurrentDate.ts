import { useRef, useState } from 'react'

const useCurrentDate = () => {
    const currentDate = useRef(new Date())
    const [year, setYear] = useState(currentDate.current.getFullYear())
    const [month, setMonth] = useState(currentDate.current.getMonth())
    const [date, setDate] = useState(currentDate.current.getDate())

    return { year, month, date, setYear, setMonth, setDate }
}

export default useCurrentDate