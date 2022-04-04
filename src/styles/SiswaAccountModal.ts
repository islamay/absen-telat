import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    box: {
        borderColor: VAR.outlineDefaultColor,
        borderWidth: 1,
        padding: 15
    },
    header: {
        fontWeight: 'bold',
    },
    content: {
        fontWeight: 'normal'
    }
})

export default styles