import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles/CustomLink'

const CustomLink = ({navigation, text, href}) => {

    const onPress = () => {
        navigation.navigate(href)
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomLink
