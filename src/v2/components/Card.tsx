import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import styleGuide from '../constants/styleGuide'

interface Props {
    style?: StyleProp<ViewStyle>
}

const Card: React.FC<Props> = ({ children, style }) => {

    return (
        <View style={[styles.container, style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleGuide.colorWhite,
        padding: 10,
        borderRadius: 14,
        ...styleGuide.shadow,
    }
})

export default Card