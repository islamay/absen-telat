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
import { useDispatch } from 'react-redux'
import auth from '../store/auth'
import { signInGuru } from '../store/thunks/authThunk'

const Login: React.FC = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(roleEnum.siswa)
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
                text: 'Coba Lagi'
            }
        ])
    }

    const onLoginButtonPressed = async () => {
        try {
            if (role === roleEnum.guru) dispatch(auth.actions.signInGuru())
            else if (role === roleEnum.siswa) dispatch(auth.actions.signInSiswa())
        } catch (error) {

        }
    }

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