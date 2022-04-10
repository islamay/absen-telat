import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderTopColor: VAR.outlineDefaultColor,
        borderTopWidth: 1,
    },
    lastContainer: {
        borderBottomColor: VAR.outlineDefaultColor,
        borderBottomWidth: 1
    },
    header: {
        fontWeight: '700'
    },
    content: {
        fontWeight: 'normal'
    }
})

export default styles