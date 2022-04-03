import { StyleSheet, StatusBar } from 'react-native'
import VAR from './VAR'
import { vhDevice } from '../helpers/viewport'
import Constants from 'expo-constants'


const styles = StyleSheet.create({
    centeredView: {
        height: vhDevice(100) - Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(197, 197, 197, 0.5)'
    },
    modalView: {
        width: '80%',
        backgroundColor: VAR.white,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 20

    },
    gap: {
        marginVertical: 10
    }
})

export default styles