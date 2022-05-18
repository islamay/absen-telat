import { Dispatch, SetStateAction } from 'react'

const textInputHandler = (setState: Dispatch<SetStateAction<any>>) => {
    return (v: any) => {
        setState(v)
    }
}

export default textInputHandler