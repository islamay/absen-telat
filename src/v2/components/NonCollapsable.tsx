import React from 'react'
import { View, StyleSheet } from 'react-native'

const NonCollapsable: React.FC = ({ children }) => {

    return (
        <View style={styles.container} collapsable={false}>
            {children}
        </View>
    )
}

export default NonCollapsable

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
