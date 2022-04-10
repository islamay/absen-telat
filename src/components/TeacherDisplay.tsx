import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/TeacherDisplay'

interface Props {
    isLast: boolean,
    name: string,
    email: string,
    role: string,
    status: string,
    onPress: () => void
}

const TeacherDisplay: React.FC<Props> = ({ isLast, name, email, role, status, onPress }) => {

    return (
        <View style={[styles.container, isLast && styles.lastContainer]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.header}>Nama : <Text style={styles.content}>{name}</Text></Text>
                <Text style={styles.header}>Email : <Text style={styles.content}>{email}</Text></Text>
                <Text style={styles.header}>Role : <Text style={styles.content}>{role}</Text></Text>
                <Text style={styles.header}>Status : <Text style={styles.content}>{status}</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

export default TeacherDisplay