import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { DefaultTheme, TextInput as PTextInput } from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/types'
import { DeepPartial } from 'redux'
import styleGuide from '../constants/styleGuide'

interface Props {
    label?: string
    value: string
    onChangeText?: (v: string) => void,
    mode?: 'flat' | 'outlined',
    secureTextEntry?: boolean,
    theme?: DeepPartial<Theme>,
    disabled?: boolean,
    editable?: boolean,
    style?: StyleProp<TextStyle>
}

const TextInput: React.FC<Props> = ({ value, onChangeText, mode, label, secureTextEntry, theme, disabled, editable, style }) => {

    return (
        <PTextInput
            style={style}
            editable={editable}
            disabled={disabled}
            label={label}
            mode={mode}
            autoComplete='off'
            value={value}
            onChangeText={onChangeText}
            theme={{ ...textInputTheme, ...theme }}
            secureTextEntry={secureTextEntry}
        />
    )
}

export const textInputTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: styleGuide.colorWhite,
        placeholder: styleGuide.colorLightGray,
        primary: styleGuide.colorPrimary
    }
}

export default TextInput