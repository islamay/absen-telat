import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from '../styles/DisplaySiswaData'

import { ISiswa } from '../services/dataSiswa'

interface onPressProps {
    nis: string,
    namaLengkap: string,
    fullClass: string,
}

interface Props extends Pick<ISiswa, 'nis' | 'namaLengkap' | 'fullClass'> {
    isLast?: boolean,
    isSingle?: boolean
    onPress?: (props: onPressProps) => void
}

const DisplaySiswaData: React.FC<Props> = ({ nis, namaLengkap, fullClass, isLast, isSingle, onPress = () => { } }) => {

    if (isSingle) {
        return (
            <View style={styles.singleContainer}>
                <Text style={styles.header}>Nis : {<Text style={styles.content}>{nis}</Text>}</Text>
                <Text style={styles.header}>Nama : {<Text style={styles.content}>{namaLengkap}</Text>}</Text>
                <Text style={styles.header}>Kelas : {<Text style={styles.content}>{fullClass}</Text>}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, isLast && styles.lastContainer]}>
            <TouchableOpacity onPress={() => { onPress({ nis, namaLengkap, fullClass }) }}>
                <Text style={styles.header}>Nis : {<Text style={styles.content}>{nis}</Text>}</Text>
                <Text style={styles.header}>Nama : {<Text style={styles.content}>{namaLengkap}</Text>}</Text>
                <Text style={styles.header}>Kelas : {<Text style={styles.content}>{fullClass}</Text>}</Text>
            </TouchableOpacity>
        </View>
    )
}


export default DisplaySiswaData