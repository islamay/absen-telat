import { StyleSheet } from 'react-native'
import VAR from './VAR'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        shadowColor: "#9a9a9a",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 7.68,
        elevation: 10
    },
    lastContainer: {
        borderBottomColor: VAR.outlineDefaultColor,
    },
    header: {
        fontWeight: '700'
    },
    content: {
        fontWeight: 'normal'
    }
})

export default styles