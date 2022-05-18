import { useEffect, useState } from 'react'
import useLoadFont from './useLoadFont'
import useRestoreToken from './useRestoreToken'

const useInitialize = () => {
    const [initialized, setInitialized] = useState(false)
    const loaded = useLoadFont()
    const isRestored = useRestoreToken()



    useEffect(() => {
        if (loaded && isRestored) {
            setInitialized(true)
        }
    }, [loaded, isRestored])

    return initialized
}

export default useInitialize