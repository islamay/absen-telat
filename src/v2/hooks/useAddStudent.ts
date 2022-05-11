import React, { useState } from 'react'
import { Majors } from '../services/student'


const useAddStudent = () => {
    const [nis, setNis] = useState('')
    const [name, setName] = useState('')
    const [grade, setGrade] = useState(10)
    const [gradeNo, setGradeNo] = useState(1)
    const [major, setMajor] = useState<Majors | ''>('')

    return { nis, setNis, name, setName, grade, setGrade, gradeNo, setGradeNo, major, setMajor }
}

export default useAddStudent
