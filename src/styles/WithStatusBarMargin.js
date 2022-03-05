import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flexGrow: 1
    }
})

export default styles