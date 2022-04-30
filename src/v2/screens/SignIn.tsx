import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Centerized from '../components/Centerized'
import Typography from '../components/Typography'
import Clean from '../layout/Clean'
import TextInput from '../components/TextInput'
import styleGuide from '../constants/styleGuide'
import Button from '../components/Button'
import { Link } from '@react-navigation/native'
import textInputHandler from '../utils/textInputHandler'
import useToggle from '../hooks/useToggle'
import { studentSignIn, teacherSignIn } from '../redux/authThunk'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import AuthModal from '../components/AuthModal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PublicStackParamList } from '../navigation/Public'

type ScreenProps = NativeStackScreenProps<PublicStackParamList, 'SignIn'>;

const SignIn: React.FC<ScreenProps> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [signInAsStudent, toggle] = useToggle(true)
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()


    const loginHandler = () => {
        if (signInAsStudent) {
            dispatch(studentSignIn({ email, password }))
        } else {
            dispatch(teacherSignIn({ email, password }))
        }
    }

    useEffect(() => {
        if (auth.isLoading || auth.isError) {
            setModalVisible(true)
        }
    }, [auth.isLoading])

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [signInAsStudent])

    return (
        <>
            <Clean>
                <AuthModal
                    visible={modalVisible}
                    closeModal={() => setModalVisible(false)}
                    isLoading={auth.isLoading}
                    isError={auth.isError}
                    errorMessage={auth.errorMessage}
                />
                <Centerized>
                    <Typography type='title' style={styles.headerText}>Selamat Datang</Typography>
                    <Typography type='body' style={styles.headerText}>Login sebagai{signInAsStudent ? ' siswa' : ' guru'}</Typography>
                    <View style={styles.container}>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                mode='outlined'
                                label='Email'
                                value={email}
                                onChangeText={textInputHandler(setEmail)}
                            />
                            <TextInput
                                secureTextEntry={true}
                                mode='outlined'
                                label='Password'
                                value={password}
                                onChangeText={textInputHandler(setPassword)}
                            />
                        </View>

                        <Button style={styles.loginButton} onPress={loginHandler}>Masuk</Button>

                        <Typography style={styles.footerText}>
                            <Link to={{ screen: 'ForgetPassword' }} style={styles.footerLinkText} >
                                Lupa Password?
                            </Link>
                        </Typography>
                        <Typography onPress={toggle} style={{ ...styles.footerText, ...styles.footerLinkText }} >Login Sebagai {signInAsStudent ? 'guru' : 'siswa'}</Typography>
                        {
                            signInAsStudent &&
                            <Typography style={styles.footerText}>Belum memiliki akun? <Link to={{ screen: 'SignUp' }} style={styles.footerLinkText}>Daftar</Link></Typography>
                        }
                    </View>
                </Centerized>
            </Clean>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: styleGuide.screenHorizontalPadding
    },
    headerText: {
        textAlign: 'center'
    },
    inputsContainer: {
        marginVertical: 50,
    },
    loginButton: {
        marginBottom: 50
    },
    footerText: {
        textAlign: 'center',
        marginBottom: 10
    },
    footerLinkText: {
        color: styleGuide.colorTertiary
    }
})

export default SignIn