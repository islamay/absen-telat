import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import TextInput, { textInputTheme } from '../components/TextInput'
import { Theme } from 'react-native-paper/lib/typescript/types'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { studentSignOut } from '../redux/authThunk'
import AuthModal from '../components/AuthModal'

const MyAccountDetail = () => {
    const [authModalVisible, setAuthModalVisible] = useState(false)
    const { student, auth } = useAppSelector(state => ({ student: state.student, auth: state.auth }))
    const dispatch = useAppDispatch()

    const handleSignOut = () => {
        dispatch(studentSignOut())
    }

    const closeModal = () => {
        setAuthModalVisible(false)
    }

    useEffect(() => {
        if (auth.isLoading || auth.isError) {
            setAuthModalVisible(true)
        }
    }, [auth.isLoading])
    return (
        <>
            <AuthModal
                visible={authModalVisible}
                closeModal={closeModal}
                isError={auth.isError}
                errorMessage={auth.errorMessage}
                isLoading={auth.isLoading}
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
                            style={[styles.textInput, { marginBottom: 20 }]}
                        />

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
        backgroundColor: styleGuide.colorDanger,
        width: 260
    }
})

export default MyAccountDetail