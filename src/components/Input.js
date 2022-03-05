import React from 'react'
import { TextInput, View, Text } from 'react-native'
import styles from '../styles/Input'

const Input = ({hint, placeholder, onChangeText}) => {

    return (
        <View style={styles.container}>
            { hint ?
                <Text style={styles.hintText}>{hint}</Text>
            : null }

            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={styles.textInput}
                />
            </View>
        </View>
    )
}

export default Input
