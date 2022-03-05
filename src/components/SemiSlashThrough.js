import React from 'react'   
import { View, Text } from 'react-native'
import styles from '../styles/SemiSlashThrough'

const SemiSlashThrough = ({text, style}) => {

    return (
        <View style={[styles.container, style]}>
            <View style={styles.lineElement}></View>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default SemiSlashThrough