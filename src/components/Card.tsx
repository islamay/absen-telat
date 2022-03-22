import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import styles from '../styles/Card'

interface CardProps {
    width?: number,
    height?: number,
    style?: StyleProp<ViewStyle>
}

const Card: React.FC<CardProps> = ({ width, height, children, style }) => {

    return (
        <View style={[styles({ width, height }).container, style]}>
            {children}
        </View>
    )
}

export default Card

