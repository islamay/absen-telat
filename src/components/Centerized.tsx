import React from 'react'
import { View, StyleSheet } from 'react-native'

const Centerized: React.FC = ({ children }) => {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Centerized