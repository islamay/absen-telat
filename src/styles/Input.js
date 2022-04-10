import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        marginVertical: 7
    },
    inputContainer: {
        backgroundColor: VAR.inputBackgroundColor,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: VAR.outlineDefaultColor,
        borderRadius: 5
    },

    textInput: {
        fontSize: VAR.smallFontSize,
        color: VAR.blackColor
    },

    hintText: {
        fontSize: VAR.tinyFontSize,
        color: VAR.secondaryTextColor,
    }
})

export default styles