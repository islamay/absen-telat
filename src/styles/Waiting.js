import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: VAR.primaryBackgroundColor
    },
    waitingContainer: {
        marginTop: 100
    },  
    waitingTitleText: {
        textAlign: 'center',
        fontSize: VAR.mediumFontSize,
        color: VAR.darkBlue
    },
    waitingMainCard: {
        marginTop: 40
    },
    waitingParagraph: {
        color: VAR.secondaryTextColor,
        textAlign: 'center'
    },
    waitingLink: {
        color: VAR.dangerText,
        textDecorationLine: 'underline'
    }
})

export default styles