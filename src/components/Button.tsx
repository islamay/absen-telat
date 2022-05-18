import React from 'react'
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import styleGuide from '../constants/styleGuide'
import Typography from './Typography'

interface Props {
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    onPress?: () => void,
    disabled?: boolean
}

const Button: React.FC<Props> = ({ children, style, onPress, textStyle, disabled }) => {

    return (
        <View style={[styles.container, style, disabled && styles.containerDisabled]}>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Typography style={[styles.textStyle, textStyle]}>{children}</Typography>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: styleGuide.colorPrimary,
        justifyContent: 'center',
        borderRadius: 16,
        ...styleGuide.shadow
    },
    textStyle: {
        fontWeight: 'bold',
        color: styleGuide.colorWhite,
        textAlign: 'center'
    },
    containerDisabled: {
        opacity: .7
    }
})

export default Button