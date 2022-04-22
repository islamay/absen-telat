import { useState } from 'react'

const useToggle = (init: boolean): [boolean, () => void] => {
    const [toggleValue, setToggle] = useState(init)

    const toggle = () => {
        setToggle(!toggleValue)
    }

    return [toggleValue, toggle]
}

export default useToggle