import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from '../styles/FloatingButton'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
    icon: any,
    onPress: () => void
}

const FloatingButton: React.FC<Props> = ({ icon, onPress }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                {icon}
            </TouchableOpacity>
        </View>
    )
}

export default FloatingButton