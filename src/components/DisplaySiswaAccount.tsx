import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/DisplaySiswaAccount'

interface Props {
    nis: string,
    fullName: string,
    fullClass: string,
    status: string,
    isLast: boolean,
    onPress: () => void
}

const DisplaySiswaAccount: React.FC<Props> = ({ nis, fullClass, fullName, status, isLast, onPress }) => {

    return (
        <View style={[styles.container, isLast && styles.lastContainer]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.header}>Nis : <Text style={styles.content}>{nis}</Text></Text>
                <Text style={styles.header}>Nama : <Text style={styles.content}>{fullName}</Text></Text>
                <Text style={styles.header}>Kelas : <Text style={styles.content}>{fullClass}</Text></Text>
                <Text style={styles.header}>Status : <Text style={styles.content}>{status}</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

export default DisplaySiswaAccount