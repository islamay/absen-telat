import React from 'react'
import { TextInput, View, Text, KeyboardTypeOptions, TextInputProps } from 'react-native'
import styles from '../styles/Input'

interface InputProps extends TextInputProps {
    hint?: string,
    onChangeText?: (value: string) => void;
    secureTextEntry?: boolean,
    keyboardType?: KeyboardTypeOptions
    value?: string
}

const Input: React.FC<InputProps> = ({ hint, placeholder, onChangeText, secureTextEntry, keyboardType = 'default', value, ...args }) => {

    return (
        <View style={styles.container}>
            {hint ?
                <Text style={styles.hintText}>{hint}</Text>
                : null}

            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={styles.textInput}
                    {...args}
                />
            </View>
        </View>
    )
}

export default Input
