import React, { useState, useEffect, useContext } from 'react'
import { View, Alert } from 'react-native'
import WithStatusBarMargin from '../components/WithStatusBarMargin'
import Title from '../components/Title'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import SemiSlashThrough from '../components/SemiSlashThrough'
import CustomPicker from '../components/CustomPicker'
import { Picker } from '@react-native-picker/picker'
import CustomLink from '../components/CustomLink'
import FormSecondaryCard from '../components/FormSecondaryCard'
import { roleEnum } from './Signup'
import styles from '../styles/Login'
import { useDispatch, useSelector } from 'react-redux'
import { signInGuru, signInSiswa } from '../store/thunks/authThunk'
import auth from '../store/auth'
import { RootState } from '../store/store'

const Login: React.FC = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(roleEnum.siswa)
    const authState = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const onUserIdentifierChange = (value: string) => {
        setEmail(value)
    }

    const onPasswordChange = (value: string) => {
        setPassword(value)
    }

    const onRoleChange = (v: string) => {
        setRole(v)
    }

    const createLoginErrorAlert = (title: string, message: string) => {
        Alert.alert(title, message, [
            {
                text: 'Ok',
                onPress: () => { dispatch(auth.actions.hideError()) }
            }
        ])
    }

    const onLoginButtonPressed = async () => {
        if (role === roleEnum.guru) dispatch(signInGuru({ email: email, password: password }))
        else dispatch(signInSiswa({ email, password }))
    }

    useEffect(() => {
        if (authState.isError) {
            createLoginErrorAlert('Login Gagal', authState.errorMessage)
        }
    }, [authState])

    return (
        <WithStatusBarMargin>
            <View style={styles.container}>
                <Title>Login</Title>
                <Card style={styles.firstCard}>
                    <Input
                        placeholder={'Email'}
                        onChangeText={onUserIdentifierChange}
                    />
                    <CustomPicker selectedValue={role} onValueChange={onRoleChange}>
                        <Picker.Item label={'Siswa'} value={roleEnum.siswa} />
                        <Picker.Item label={'Guru'} value={roleEnum.guru} />
                    </CustomPicker>
                    <Input
                        secureTextEntry={true}
                        hint={'Password Harus Memiliki Setidaknya 8 Huruf'}
                        placeholder={'Password'}
                        onChangeText={onPasswordChange}
                    />
                    <Button text={'Masuk'} onPress={onLoginButtonPressed} style={styles.loginBtn} />
                    <SemiSlashThrough style={styles.atau} text={'ATAU'} />
                    <CustomLink text={'Lupa kata sandi?'} />
                </Card>

                <FormSecondaryCard
                    style={styles.secondCard}
                    navigation={navigation}
                />
            </View>
        </WithStatusBarMargin>
    )
}

export default Login