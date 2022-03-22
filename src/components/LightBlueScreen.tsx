import React from 'react'
import { View } from 'react-native'
import styles from '../styles/LightBlueScreen'

const LightBlueScreen = ({children}) => {

    return (
        <View style={styles.container}>{children}</View>
    )
}

export default LightBlueScreen
