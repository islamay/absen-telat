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
import { NavigationAction } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import auth from '../store/auth'

const Login: React.FC = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(roleEnum.siswa)
    const dispatch = useDispatch()

    const onUserIdentifierChange = (value) => {
        setEmail(value)
    }

    const onPasswordChange = (value) => {
        setPassword(value)
    }

    const onRoleChange = v => {
        setRole(v)
    }

    const createLoginErrorAlert = (title, message) => {
        Alert.alert(title, message, [
            {
                text: 'Coba Lagi'
            }
        ])
    }

    const onLoginButtonPressed = async () => {

        if (role === roleEnum.guru) {
            try {
                console.log('Login Guru');
                dispatch(auth.actions.signIn())
            } catch (error) {
                console.log('error');
            }
        }

        if (role === roleEnum.siswa) {
            try {
                console.log('Login Siswa');
            } catch (error) {
                console.log(error);
            }
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