import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import WithStatusBarMargin from '../components/WithStatusBarMargin'
import Title from '../components/Title'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import SemiSlashThrough from '../components/SemiSlashThrough'
import CustomLink from '../components/CustomLink'
import FormSecondaryCard from '../components/FormSecondaryCard'
import styles from '../styles/Login'
import { useDispatch } from 'react-redux'
import { signUpSiswa } from '../store/thunks/authThunk'

export const roleEnum = {
    guru: 'GURU',
    siswa: 'SISWA'
}

const Login: React.FC = ({ navigation }) => {
    const [NIS, setNIS] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()

    const onNISChange = (v: string) => {
        setNIS(v)
    }

    const onEmailChange = (v: string) => {
        setEmail(v)
    }

    const onPasswordChange = (v: string) => {
        setPassword(v)
    }

    const onPasswordConfirmationChange = (v: string) => {
        setConfirmationPassword(v)
    }

    const createSignupErrorAlert = () => {
        Alert.alert('Password Tidak Sesuai', 'Password dan Konfirmasi Password Tidak Sesuai', [
            {
                text: 'Ulangi'
            }
        ])
    }

    const onSignupButtonPressed = async () => {
        dispatch(signUpSiswa({ nis: NIS, email, password }))
    }

    return (
        <WithStatusBarMargin>
            <ScrollView>
                <View style={styles.container}>
                    <Title>Signup</Title>
                    <Card style={styles.firstCard}>
                        <Input
                            placeholder={'NIS'}
                            onChangeText={onNISChange}
                        />

                        <Input
                            placeholder={'Email'}
                            onChangeText={onEmailChange}
                        />


                        <Input
                            hint={'Password Harus Memiliki Setidaknya 8 Huruf'}
                            placeholder={'Password'}
                            onChangeText={onPasswordChange}
                            secureTextEntry={true}
                        />
                        <Input
                            placeholder={'Konfirmasi Password'}
                            onChangeText={onPasswordConfirmationChange}
                            secureTextEntry={true}
                        />
                        <Button disabled={submitted} text={'Daftar'} style={styles.loginBtn} onPress={onSignupButtonPressed} />
                    </Card>

                    <FormSecondaryCard
                        style={styles.secondCard}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        </WithStatusBarMargin>
    )
}

export default Login