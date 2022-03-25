import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import auth from '../store/auth'
import styles from '../styles/Waiting'

const Home = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(auth.actions.signOut())
    }



    return (
        <View style={styles.container}>
            <View style={styles.waitingContainer}>
                <Text style={styles.waitingTitleText}>Selamat Datang</Text>
                <Card style={styles.waitingMainCard}>
                    <Text style={styles.waitingParagraph}>Akun Anda Belum Aktif Hubungi Admin Untuk MengaktifkanAkun Atau <Text onPress={handleLogout} style={styles.waitingLink}>Logout</Text></Text>
                </Card>
            </View>
        </View>
    )
}

export default Home