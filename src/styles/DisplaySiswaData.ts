import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: VAR.outlineDefaultColor,
        borderTopWidth: 1,
    },
    lastContainer: {
        borderBottomWidth: 1
    },
    singleContainer: {
        padding: 20,
        borderColor: VAR.outlineDefaultColor,
        borderWidth: 1,
    },
    header: {
        fontWeight: '700'
    },
    content: {
        fontWeight: 'normal'
    }
})

export default styles