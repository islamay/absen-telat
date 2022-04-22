import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Clean from '../layout/Clean'
import Centerized from '../components/Centerized'
import Typography from '../components/Typography'
import TextInput from '../components/TextInput'
import textInputHandler from '../utils/textInputHandler'
import Button from '../components/Button'
import styleGuide from '../constants/styleGuide'
import { Link } from '@react-navigation/native'

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('')

    const handleSendVerification = () => {

    }

    const handleBack = () => {

    }

    return (
        <Clean>
            <Centerized>
                <View style={styles.container}>
                    <Typography type='title' style={styles.headerText} >Kesulitan Login?</Typography>
                    <Typography style={styles.headerText} >Masukkan email dan kami akan mengirimkan kode verifikasi</Typography>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            mode='outlined'
                            label='Email'
                            value={email}
                            onChangeText={textInputHandler(setEmail)}
                        />
                    </View>
                    <Button onPress={handleSendVerification} style={styles.footerButton}>Kirim Kode Verifikasi</Button>
                    <Button onPress={handleBack} style={[styles.footerButton, styles.backButtonStyle]} textStyle={styles.backButtonTextStyle}>Kembali ke Halaman Login</Button>
                    <Typography style={styles.footerText} >Belum memiliki akun? <Link to={{ screen: 'SignUp' }} style={styles.footerLink}>Daftar</Link></Typography>
                </View>
            </Centerized>
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50
    },
    headerText: {
        textAlign: 'center'
    },
    inputsContainer: {
        marginVertical: 50
    },
    footerButton: {
        marginBottom: 30
    },
    footerText: {
        textAlign: 'center'
    },
    footerLink: {
        color: styleGuide.colorTertiary
    },
    backButtonStyle: {
        backgroundColor: styleGuide.colorWhite,
    },
    backButtonTextStyle: {
        color: styleGuide.colorTertiary
    }
})

export default ForgetPassword