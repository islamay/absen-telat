import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import AbsenChoiceButton from '../components/AbsenChoiceButton'
import absenChoiceEnum from '../helpers/absenChoiceEnum'
import styles from '../styles/GuruHome'

const Home = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pilih Metode Untuk Mengabsen</Text>
            <View style={styles.buttonContainer}>
                <AbsenChoiceButton method={absenChoiceEnum.SCAN} navigation={navigation} />
                <AbsenChoiceButton method={absenChoiceEnum.MANUAL} navigation={navigation} />
            </View>
        </View>
    )
}

export default Home