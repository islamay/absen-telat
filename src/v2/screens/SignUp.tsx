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
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { studentSignUp } from '../redux/authThunk'
import AuthModal from '../components/AuthModal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PublicStackParamList } from '../navigation/Public'
import { useStudentSignUpMutation } from '../services/student'

type ScreenProps = NativeStackScreenProps<PublicStackParamList>;

const SignUp: React.FC<ScreenProps> = ({ navigation }) => {
    const [nis, setNis] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const isInputValid = !!nis && !!email && !!password && !!passwordConfirmation && password === passwordConfirmation
    const [signUp, { isError, isLoading, isSuccess }] = useStudentSignUpMutation()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignup = async () => {
        try {
            const signingUp = signUp({ nis, email, password }).unwrap()
            await signingUp
        } catch (error: any) {
            if (error.status && error.data) {
                setErrorMessage(error.data.message)
            }
            console.log(error);
        }
    }

    const goBackToLogin = () => {
        navigation.navigate('StudentSignIn')
    }

    return (
        <Clean>
            <Centerized>
                <View style={styles.container}>
                    <AuthModal
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={errorMessage}
                        displaySuccess={true}
                        errorTitle={'Gagal mendaftar'}
                        isSuccess={isSuccess}
                        successTitle={'berhasil mendaftar'}
                        successMessage={'Berhasil membuat akun, hubungi admin untuk mengaktifakan'}
                    />
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
                            secureTextEntry={true}
                            onChangeText={textInputHandler(setPassword)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Konfirmasi Password'
                            value={passwordConfirmation}
                            secureTextEntry={true}
                            onChangeText={textInputHandler(setPasswordConfirmation)}
                        />
                    </View>
                    <Button disabled={!isInputValid} onPress={handleSignup} style={styles.signUpBotton}>Daftar</Button>
                    <Typography style={styles.footerText}>Sudah memiliki akun?
                        <Typography style={styles.footerLinkText} onPress={goBackToLogin}>&nbsp;Masuk</Typography>
                    </Typography>
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