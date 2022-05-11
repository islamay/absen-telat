import { FontAwesome } from '@expo/vector-icons'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Theme } from 'react-native-paper/lib/typescript/types'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import type { TeacherStackParamList } from '../navigation/Teacher'
import type { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import TextInput, { textInputTheme } from '../components/TextInput'
import AuthModal from '../components/AuthModal'
import { useAppSelector } from '../hooks/redux'
import { useTeacherSignOutMutation } from '../services/teacher'
import Button from '../components/Button'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    MaterialBottomTabScreenProps<TeacherHomeStackParamList, 'Profile'>
>

const TeacherProfile: React.FC<ScreenProps> = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const teacher = useAppSelector(state => state.teacher)
    const [signout, { isLoading, isSuccess, isError }] = useTeacherSignOutMutation()

    const handleSignout = async () => {
        try {
            signout()
        } catch (error: any) {
            if (!!error.status && !!error.data && !!error.data.message) {
                setErrorMessage(error.data.message)
            } else {
                setErrorMessage('Penyebab tidak diketahui. coba lagi atau buka ulang aplikasi')
            }
        }
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
                    icon: <FontAwesome size={96} name='user' color={styleGuide.colorSecondary} />,
                    navigation: navigation
                }}
            >
                <ClassicBodyHeader>
                    <Typography type='title'>Detail</Typography>
                </ClassicBodyHeader>
                <ClassicBodyContents>
                    <View style={styles.container}>
                        <TextInput
                            mode='outlined'
                            label='Nama'
                            value={teacher.nama}
                            editable={false}
                            theme={customTextInputTheme}
                            style={[styles.textInput]}
                        />
                        <TextInput
                            mode='outlined'
                            label='Email'
                            value={teacher.email}
                            editable={false}
                            theme={customTextInputTheme}
                            style={[styles.textInput]}
                        />
                        <TextInput
                            mode='outlined'
                            label='Role'
                            value={teacher.role}
                            editable={false}
                            theme={customTextInputTheme}
                            style={[styles.textInput]}
                        />

                        <Button style={styles.logoutButton} onPress={handleSignout}>Logout</Button>
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
        text: styleGuide.colorPrimary,
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
    }
})

export default TeacherProfile