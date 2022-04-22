import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Clean from '../layout/Clean'
import Centerized from '../components/Centerized'
import Typography from '../components/Typography'
import TextInput from '../components/TextInput'
import textInputHandler from '../utils/textInputHandler'
import StyleGuide from '../constants/styleGuide'
import Button from '../components/Button'
import { Link } from '@react-navigation/native'

const SignUp = () => {
    const [nis, setNis] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSignup = () => {

    }

    return (
        <Clean>
            <Centerized>
                <View style={styles.container}>
                    <Typography type='title' style={styles.headerText}>Selamat Datang</Typography>
                    <Typography style={styles.headerText}>Silahkan Daftar</Typography>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            mode='outlined'
                            label='Nis'
                            value={nis}
                            onChangeText={textInputHandler(setNis)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Email'
                            value={email}
                            onChangeText={textInputHandler(setEmail)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Password'
                            value={password}
                            onChangeText={textInputHandler(setPassword)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Konfirmasi Password'
                            value={passwordConfirmation}
                            onChangeText={textInputHandler(setPasswordConfirmation)}
                        />
                    </View>
                    <Button onPress={handleSignup} style={styles.signUpBotton}>Daftar</Button>
                    <Typography style={styles.footerText}>Sudah Memiliki Akun? <Link to={{ screen: 'SignIn' }} style={styles.footerLinkText}>Masuk</Link></Typography>
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
    signUpBotton: {
        marginBottom: 50
    },
    footerText: {
        textAlign: 'center'
    },
    footerLinkText: {
        color: StyleGuide.colorTertiary
    }
})

export default SignUp