import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        width: 200,
        padding: 15,
        marginVertical: 20,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: VAR.secondaryBackgroundColor,
        position: 'relative'
    },
    text: {
        textAlign: 'center',
        color: VAR.darkBlue
    },
    iconContainer: {
        backgroundColor: VAR.secondaryBackgroundColor,
        borderRadius: 10,
        padding: 4,
        borderRadius: 20,
        position: 'absolute',
        top: '-160%',
        left: '50%',
        marginLeft: -15
        
    },
    icon: {
        alignSelf: 'center'
    }
})

export default styles