import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        backgroundColor: VAR.buttonPrimary,
        paddingVertical: 5,
        borderRadius: 5
    },
    disabled: {
        opacity: .5
    },
    text: {
        textAlign: 'center',
        fontSize: VAR.xSmallFontSize,
        fontWeight: 'bold',
        color: VAR.white,
    },
    danger: {
        backgroundColor: VAR.dangerText
    }
})

export default styles