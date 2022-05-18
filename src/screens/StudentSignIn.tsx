import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AuthModal from '../components/AuthModal'
import Button from '../components/Button'
import Centerized from '../components/Centerized'
import TextInput from '../components/TextInput'
import Typography from '../components/Typography'
import { AccountType } from '../constants/account'
import styleGuide from '../constants/styleGuide'
import Clean from '../layout/Clean'
import { PublicStackParamList } from '../navigation/Public'
import { useStudentSignInMutation } from '../services/student'
import textInputHandler from '../utils/textInputHandler'

type ScreenProps = NativeStackScreenProps<PublicStackParamList, 'StudentSignIn'>

const TeacherSignIn: React.FC<ScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signin, { isLoading, isSuccess, isError }] = useStudentSignInMutation()

    const goToResetPassword = () => {
        navigation.navigate('RequestChangePassword', { accountType: AccountType.SISWA })
    }

    const goToTeacherSignIn = () => {
        navigation.navigate('TeacherSignIn')
    }

    const handleSignin = async () => {
        if (!email || !password) return;

        try {
            const authenticating = signin({ email, password }).unwrap()
            await authenticating
        } catch (error: any) {
            if (error.status && error.data) {
                setErrorMessage(error.data.message)
            }
        }
    }

    return (
        <Clean>
            <AuthModal
                displaySuccess={false}
                successMessage=''
                successTitle=''
                errorTitle='Gagal masuk'
                errorMessage={errorMessage}
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
            />
            <Centerized>
                <View style={styles.header}>
                    <Typography type='title'>Selamat datang</Typography>
                    <Typography type='body'>Login sebagai siswa</Typography>
                </View>
                <View style={styles.body}>
                    <TextInput
                        mode='outlined'
                        value={email}
                        label='Email'
                        onChangeText={textInputHandler(setEmail)}
                    />
                    <TextInput
                        mode='outlined'
                        value={password}
                        label='Password'
                        onChangeText={textInputHandler(setPassword)}
                        secureTextEntry={true}
                    />
                    <Button onPress={handleSignin} style={styles.button}>Masuk</Button>
                </View>
                <View style={styles.footer}>
                    <Typography type='body' style={styles.link} onPress={goToResetPassword}>Lupa password?</Typography>
                    <Typography type='body' style={styles.link} onPress={goToTeacherSignIn}>Login sebagai guru</Typography>
                </View>
            </Centerized>
        </Clean>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center'
    },
    body: {
        padding: styleGuide.screenHorizontalPadding,
        marginVertical: 50
    },
    footer: {
        alignItems: 'center'
    },
    button: {
        marginTop: 50
    },
    link: {
        color: styleGuide.colorTertiary,
        marginVertical: 2
    }
})

export default TeacherSignIn