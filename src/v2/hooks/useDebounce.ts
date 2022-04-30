import { useState, useEffect, useRef } from 'react'

interface Props {
    cb: () => Promise<void> | void,
    delay: number,
    deps: any[]
}

const useDebounce = (cb: () => void | Promise<void>, delay: number, deps: any[]) => {
    const [isWaiting, setIsWaiting] = useState(false)
    const isFirstTime = useRef(true)
    const timeoutRef = useRef<any>()


    useEffect(() => {
        if (isFirstTime.current) {
            isFirstTime.current = false
            return
        }


        if (isWaiting) {
            clearTimeout(timeoutRef.current)
        }

        setIsWaiting(true)
        timeoutRef.current = setTimeout(() => {
            setIsWaiting(false)
            cb()
        }, delay)



    }, [...deps])

}

export default useDebounce