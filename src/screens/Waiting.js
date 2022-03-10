import React, {useContext, useEffect} from 'react'
import { View, Text } from 'react-native'
import Card from '../components/Card'
import AuthContext from '../hooks/AuthContext'
import styles from '../styles/Waiting'

const Home = () => {
    const {signOut} = useContext(AuthContext)

    const onWaitingLinkPressed = () => {
        signOut()
    }



    return (
        <View style={styles.container}>
            <View style={styles.waitingContainer}>
                <Text style={styles.waitingTitleText}>Selamat Datang</Text>
                <Card style={styles.waitingMainCard}>
                    <Text style={styles.waitingParagraph}>Akun Anda Belum Aktif Hubungi Admin Untuk MengaktifkanAkun Atau <Text onPress={onWaitingLinkPressed} style={styles.waitingLink}>Logout</Text></Text>
                </Card>
            </View>
        </View>
    )
}

export default Home