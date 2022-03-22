import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/Button'

const Button = ({text, onPress, style, disabled}) => {

    return (
        <View style={[styles.container, style]} >
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button