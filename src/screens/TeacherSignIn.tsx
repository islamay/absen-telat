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
import { useTeacherSignInMutation } from '../services/teacher'
import sleep from '../utils/sleep'
import textInputHandler from '../utils/textInputHandler'

type ScreenProps = NativeStackScreenProps<PublicStackParamList, 'TeacherSignIn'>

const TeacherSignIn: React.FC<ScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, { isLoading, isError, isSuccess }] = useTeacherSignInMutation()
    const [errorMessage, setErrorMessage] = useState('')

    const handleAuthenticate = async () => {
        try {
            const authenticating = signIn({ email, password }).unwrap()
            await authenticating
        } catch (error: any) {
            if (!!error.status && !!error.data) {
                setErrorMessage(error.data.message)
            } else {
                setErrorMessage('Ulangi')
            }
        }
    }

    const goToResetPassword = () => {
        navigation.navigate('RequestChangePassword', { accountType: AccountType.GURU })
    }

    const goToStudentSignIn = () => {
        navigation.navigate('StudentSignIn')
    }

    return (
        <Clean>
            <AuthModal
                errorTitle='gagal signin'
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                displaySuccess={false}
                isSuccess={isSuccess}
                successMessage=''
                successTitle=''
            />
            <Centerized>
                <View style={styles.header}>
                    <Typography type='title'>Selamat datang</Typography>
                    <Typography type='body'>Login sebagai guru</Typography>
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
                        secureTextEntry={true}
                        onChangeText={textInputHandler(setPassword)}
                    />
                    <Button onPress={handleAuthenticate} style={styles.button}>Masuk</Button>
                </View>
                <View style={styles.footer}>
                    <Typography type='body' style={styles.link} onPress={goToResetPassword}>Lupa password?</Typography>
                    <Typography type='body' style={styles.link} onPress={goToStudentSignIn}>Login sebagai siswa</Typography>
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
        alignItems: 'center',
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