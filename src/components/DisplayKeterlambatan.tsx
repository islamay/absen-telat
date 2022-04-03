import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles/DisplayKeterlambatan'

interface Props {
    nis: string,
    namaLengkap: string,
    kelas: string,
    isLast?: boolean,
    alasan: string
}

const DisplayKeterlambatan: React.FC<Props> = ({ nis, namaLengkap, kelas, isLast, alasan }) => {

    return (
        <TouchableOpacity>
            <View style={[styles.container, isLast && styles.lastContainer]}>
                <Text style={styles.header}>Nis : <Text style={styles.content}>{nis}</Text></Text>
                <Text style={styles.header}>Nama Lengkap : <Text style={styles.content}>{namaLengkap}</Text></Text>
                <Text style={styles.header}>Kelas : <Text style={styles.content}>{kelas}</Text></Text>
                <Text style={styles.header}>Alasan : <Text style={styles.content}>{alasan}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

export default DisplayKeterlambatan