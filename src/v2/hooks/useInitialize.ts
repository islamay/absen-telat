import { useEffect, useState } from 'react'
import useLoadFont from './useLoadFont'

const useInitialize = () => {
    const [initialized, setInitialized] = useState(false)
    const loaded = useLoadFont()




    useEffect(() => {
        if (loaded) {
            setInitialized(true)
        }
    }, [loaded])

    return initialized
}

export default useInitialize