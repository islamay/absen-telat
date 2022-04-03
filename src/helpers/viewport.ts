import { Dimensions } from 'react-native'

export const vw = (percentage: number) => {
    const vw = Dimensions.get('screen').width / 100
    return vw * percentage
}

export const vh = (percentage: number) => {
    const vh = Dimensions.get('screen').height / 100
    return vh * percentage
}

export const vhDevice = (percentage: number) => {
    const vh = Dimensions.get('window').height / 100
    return vh * percentage
}