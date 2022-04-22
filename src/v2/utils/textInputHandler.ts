import { Dispatch, SetStateAction } from 'react'

const textInputHandler = (setState: Dispatch<SetStateAction<string>>) => {
    return (v: string) => {
        setState(v)
    }
}

export default textInputHandler