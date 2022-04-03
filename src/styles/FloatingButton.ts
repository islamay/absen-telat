import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        position: 'absolute',
        zIndex: 10000,
        right: 28,
        bottom: 28,
        backgroundColor: VAR.darkBlue,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
})

export default styles