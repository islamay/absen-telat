import React, { useState } from 'react'
import NotificationSnack from '../components/NotificationSnack'
import styleGuide from '../constants/styleGuide'
import { View, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Centerized from '../components/Centerized'
import TextInput from '../components/TextInput'
import Typography from '../components/Typography'
import Clean from '../layout/Clean'
import { useRequestChangePasswordMutation as useStudentRequestChangePasswordMutation } from '../services/student'
import textInputHandler from '../utils/textInputHandler'
import { ActivityIndicator } from 'react-native-paper'
import type { PublicStackParamList } from '../navigation/Public'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AccountType } from '../constants/account'
import { useRequestChangePasswordMutation as useTeacherRequestChangePasswordMutation } from '../services/teacher'

type ScreenProps = NativeStackScreenProps<PublicStackParamList, 'RequestChangePassword'>

const RequestChangePassword: React.FC<ScreenProps> = ({ route, navigation }) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [requestStudentChangePassword] = useStudentRequestChangePasswordMutation()
    const [requestTeacherChangePassword] = useTeacherRequestChangePasswordMutation()

    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false)
    }

    const handleConfirmButton = async () => {
        if (route.params.accountType === AccountType.SISWA) {
            try {
                setIsLoading(true)
                await requestStudentChangePassword({ email }).unwrap()
                setIsSuccess(true)
            } catch (error: any) {
                if (error && error.data && error.data.message) {
                    setErrorMessage(error.data.message)
                }
            } finally {
                setIsLoading(false)
                setSnackbarVisible(true)
            }
        } else {
            try {
                setIsLoading(true)
                await requestTeacherChangePassword({ email }).unwrap()
                setIsSuccess(true)
            } catch (error: any) {
                if (error && error.data && error.data.message) {
                    setErrorMessage(error.data.message)
                } else {
                    setErrorMessage('Error tidak diketahui')
                }
            } finally {
                setIsLoading(false)
                setSnackbarVisible(true)
            }
        }
    }

    const handleBack = () => {
        setEmail('')
        navigation.goBack()
    }

    return (
        <Clean>
            <Centerized>
                <View style={styles.container}>

                    <Typography type='title' style={styles.headerText}>Kesulitan Login?</Typography>
                    <Typography type='tiny' style={styles.headerText}>Masukkan email dan kami akan mengirim link untuk mereset password anda</Typography>
                    <TextInput
                        mode='outlined'
                        label='Email'
                        value={email}
                        onChangeText={textInputHandler(setEmail)}
                        style={styles.emailInput}
                    />
                    <Button
                        style={styles.button}
                        disabled={!email ? true : false}
                        onPress={handleConfirmButton}
                    >
                        {
                            isLoading
                                ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorWhite} />
                                : 'Konfirmasi'
                        }
                    </Button>
                    <Button
                        style={[styles.button, styles.backButton]}
                        onPress={handleBack}
                    >
                        <Typography type='body' style={styles.backButtonText}>Kembali ke halaman login</Typography>
                    </Button>
                </View>
            </Centerized>
            <NotificationSnack
                visible={snackbarVisible}
                onDismiss={handleSnackbarDismiss}
                errorMessage={errorMessage}
                isSuccess={isSuccess}
                successMessage='Berhasil mengirim email'
            />
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
    emailInput: {
        marginVertical: 20
    },
    button: {
        marginVertical: 10
    },
    backButton: {
        backgroundColor: styleGuide.colorWhite,
    },
    backButtonText: {
        color: styleGuide.colorTertiary
    }
})

export default RequestChangePassword