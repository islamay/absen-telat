import React from 'react'
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import styles from '../styles/Button'

interface ButtomProps {
    text: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
    disabled?: boolean
}

const Button: React.FC<ButtomProps> = ({ text, onPress, style, disabled }) => {

    return (
        <View style={[styles.container, style]} >
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button