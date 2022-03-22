import { Dimensions } from 'react-native'

export const vw = (percentage) => {
    const vw = Dimensions.get('screen').width / 100
    return vw * percentage
}

export const vh = (percentage) => {
    const vh = Dimensions.get('screen').height / 100
    return vh * percentage
}
