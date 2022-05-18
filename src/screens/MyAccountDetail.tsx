import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import TextInput, { textInputTheme } from '../components/TextInput'
import { Theme } from 'react-native-paper/lib/typescript/types'
import Button from '../components/Button'
import { useAppSelector } from '../hooks/redux'
import AuthModal from '../components/AuthModal'
import { useStudentSignOutMutation } from '../services/student'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StudentStackParamList } from '../navigation/Student'
import { CompositeScreenProps } from '@react-navigation/native'
import { StudentHomeStackParamList } from '../navigation/StudentHome'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { AccountType } from '../constants/account'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<StudentStackParamList, 'HomeStack'>,
    MaterialBottomTabScreenProps<StudentHomeStackParamList, 'MyAccount'>
>

const MyAccountDetail: React.FC<ScreenProps> = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const student = useAppSelector(state => state.student)
    const [signout, { isLoading, isSuccess, isError }] = useStudentSignOutMutation()

    const handleSignOut = async () => {
        try {
            signout()
        } catch (error: any) {
            if (!!error.status && !!error.data) {
                setErrorMessage(error.data.message)
            }
        }
    }

    const goToChangePassword = () => {
        navigation.navigate('ChangePassword', { accountType: AccountType.SISWA })
    }

    return (
        <>
            <AuthModal
                isSuccess={isSuccess}
                displaySuccess={false}
                successMessage=''
                successTitle=''
                errorTitle='Gagal signout'
                errorMessage={errorMessage}
                isError={isError}
                isLoading={isLoading}
            />
            <Classic
                header={{
                    title: 'Akun Saya',
                    icon: <FontAwesome size={96} name='user' color={styleGuide.colorSecondary} />
                }}
            >
                <ClassicBodyHeader>
                    <Typography type='title'>Detail</Typography>
                </ClassicBodyHeader>
                <ClassicBodyContents>
                    <View style={styles.container}>
                        <TextInput
                            mode='outlined'
                            label='Nis'
                            value={student.nis}
                            editable={false}
                            theme={customTextInputTheme}
                            style={styles.textInput}
                        />
                        <TextInput
                            mode='outlined'
                            label='Nama'
                            value={student.name}
                            editable={false}
                            theme={customTextInputTheme}
                            style={[styles.textInput]}
                        />
                        <TextInput
                            mode='outlined'
                            label='Kelas'
                            value={student.fullClass}
                            editable={false}
                            theme={customTextInputTheme}
                            style={styles.textInput}
                        />
                        <Typography
                            style={styles.link}
                            onPress={goToChangePassword}
                        >
                            Ganti password
                        </Typography>

                        <Button style={styles.logoutButton} onPress={handleSignOut}>Logout</Button>
                    </View>
                </ClassicBodyContents>
            </Classic>
        </>
    )
}

const customTextInputTheme: Theme = {
    ...textInputTheme,
    colors: {
        ...textInputTheme.colors,
        text: styleGuide.colorGray,
        placeholder: styleGuide.colorLightGray
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    profileIcon: {
        alignSelf: 'center',
        marginBottom: 20
    },
    textInput: {
        width: 260,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: styleGuide.colorDanger,
        width: 260
    },
    link: {
        color: styleGuide.colorTertiary,
        marginTop: 10
    }
})

export default MyAccountDetail