import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../components/Typography'
import Clean, { CleanHeader } from '../layout/Clean'
import TextInput from '../components/TextInput'
import textInputHandler from '../utils/textInputHandler'
import Button from '../components/Button'
import { useAppSelector } from '../hooks/redux'
import { AccountType } from '../constants/account'
import { TeacherStackParamList } from '../navigation/Teacher'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useChangePasswordMutation as useTeacherChangePasswordMutation } from '../services/teacher'
import { useChangePasswordMutation as useStudentChangePasswordMutation } from '../services/student'
import NotificationSnack from '../components/NotificationSnack'
import { ActivityIndicator } from 'react-native-paper'
import styleGuide from '../constants/styleGuide'

type ScreenProps = NativeStackScreenProps<TeacherStackParamList, 'ChangePassword'>

const ChangePassword: React.FC<ScreenProps> = ({ route }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSucceess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [changeStudentPassword] = useStudentChangePasswordMutation()
    const [changeTeacherPassword] = useTeacherChangePasswordMutation()
    const isValid = !!oldPassword && (newPassword.length >= 8) && (newPassword === passwordConfirmation)
    const state = useAppSelector(state => ({ student: state.student, teacher: state.teacher }))

    const handleChangePassword = async () => {
        let changePassword: any
        if (route.params.accountType === AccountType.SISWA) {
            changePassword = changeStudentPassword
        } else {
            changePassword = changeTeacherPassword
        }
        try {
            setIsLoading(true)
            await changePassword({
                id: route.params.accountType === AccountType.SISWA
                    ? state.student.nis
                    : state.teacher.id,
                oldPassword,
                newPassword
            }).unwrap()
            setIsSucceess(true)
        } catch (error: any) {
            setIsSucceess(false)
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

    const snackbarDismiss = () => {
        setSnackbarVisible(false)
    }

    return (
        <Clean>
            <CleanHeader
                title='Ganti password'
                withBackButton={true}
            />
            <View style={styles.container}>
                <TextInput
                    mode='outlined'
                    label='Password lama'
                    value={oldPassword}
                    secureTextEntry={true}
                    onChangeText={textInputHandler(setOldPassword)}
                />
                <TextInput
                    mode='outlined'
                    label='Password Baru'
                    value={newPassword}
                    secureTextEntry={true}
                    onChangeText={textInputHandler(setNewPassword)}
                />
                <TextInput
                    mode='outlined'
                    label='Password Konfirmasi'
                    value={passwordConfirmation}
                    secureTextEntry={true}
                    onChangeText={textInputHandler(setPasswordConfirmation)}
                />
                <Button
                    disabled={(isValid && !isLoading) ? false : true}
                    style={styles.confirmationButton}
                    onPress={handleChangePassword}
                >
                    {
                        isLoading
                            ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorWhite} />
                            : 'Konfirmasi'
                    }
                </Button>
            </View>
            <NotificationSnack
                visible={snackbarVisible}
                onDismiss={snackbarDismiss}
                isSuccess={isSuccess}
                successMessage='Berhasil mengganti password'
                errorMessage={errorMessage}
            />
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50
    },
    confirmationButton: {
        marginTop: 30
    }
})

export default ChangePassword