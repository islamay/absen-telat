import { useState, useEffect, useMemo } from 'react'

const useCombinedData = <T>(newDataParam: T[]) => {
    const [combinedData, setCombinedData] = useState<T[]>([])

    useEffect(() => {
        const newCombinedData = [...combinedData, ...newDataParam]
        setCombinedData(newCombinedData)
    }, [newDataParam])

    return combinedData
}

export default useCombinedData

