import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: VAR.primaryBackgroundColor
    },

    title: {
        color: VAR.darkBlue,
        fontSize: VAR.smallFontSize,
        marginTop: 100,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    buttonContainer: {
        marginTop: 20        
    }
})

export default styles