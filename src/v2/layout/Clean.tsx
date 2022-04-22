import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import styleGuide from '../constants/styleGuide'

const Clean: React.FC = ({ children }) => {
    const styles = makeStyle()

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const makeStyle = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: styleGuide.colorWhite,
            flexGrow: 1,
            paddingTop: StatusBar.currentHeight
        }
    })
}

export default Clean