import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    box: {
        padding: 20,
        borderWidth: 1,
        borderColor: VAR.outlineDefaultColor
    },
    header: {
        fontWeight: '700'
    },
    content: {
        fontWeight: 'normal'
    }
})

export default styles