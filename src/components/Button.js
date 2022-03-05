import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/Button'

const Button = ({text, onPress, style}) => {

    return (
        <View style={[styles.container, style]} >
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button