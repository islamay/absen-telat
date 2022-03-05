import React from 'react'
import { View } from 'react-native'
import styles from '../styles/Card'

const Card = ({width, height, children, style}) => {

    return (
        <View style={[styles({width, height}).container, style]}>
            {children}
        </View>
    )
}

export default Card

