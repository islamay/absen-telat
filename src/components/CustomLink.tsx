import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles/CustomLink'
import { useNavigation } from '@react-navigation/native'

interface CustomLinkProps {
    text?: string,
    href: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, href }) => {
    const navigation = useNavigation()

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
