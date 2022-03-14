import {FILL_DATA, WIPE_DATA} from './userDataTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const fillData = async (userData) => {
    try {
        await AsyncStorage.setItem('user-data', userData)
        return {type: FILL_DATA, payload: {userData: userData}}
    } catch (error) {
        throw new Error(error)
    }
}

export const wipeData = () => ({
    type: WIPE_DATA
})
