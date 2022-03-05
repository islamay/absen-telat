import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/Title'

const Title = ({children}) => {

    return (
        <View >
            <Text style={styles.text}>{children}</Text>
        </View>
        )
}

export default Title
