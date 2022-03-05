import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    lineElement: {
        height: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: VAR.outlineDefaultColor,
        position: 'absolute',
        bottom: '50%'
    },

    text: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: VAR.white,
        width: '30%'
    }
})

export default styles