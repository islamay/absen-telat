import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import QRCode from 'react-native-qrcode-svg'
import VAR from '../styles/VAR'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const StudentHome: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const [stringifyPayload, setStringifyPayload] = useState('')

    useEffect(() => {
        let payload: { nis: string, namaLengkap: string, kelas: string } | string = {
            nis: user.nis,
            namaLengkap: user.namaLengkap,
            kelas: user.fullClass
        }

        payload = JSON.stringify(payload)
        setStringifyPayload(payload)
    }, [user])

    return (
        <LightBlueScreen>
            <View style={styles.qrCodeContainer}>
                {
                    typeof stringifyPayload === 'string' && stringifyPayload.length !== 0
                        ? <QRCode
                            size={200}
                            value={stringifyPayload}
                        />
                        : null
                }

            </View>
        </LightBlueScreen>
    )
}

const styles = StyleSheet.create({
    qrCodeContainer: {
        alignSelf: 'center',
        marginBottom: 'auto',
        marginTop: 'auto',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: VAR.outlineDefaultColor,
        borderWidth: 1
    }
})

export default StudentHome
