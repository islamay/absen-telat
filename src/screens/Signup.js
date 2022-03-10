import React, {useState, useContext} from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import WithStatusBarMargin from '../components/WithStatusBarMargin'
import Title from '../components/Title'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import SemiSlashThrough from '../components/SemiSlashThrough'
import CustomLink from '../components/CustomLink'
import FormSecondaryCard from '../components/FormSecondaryCard'
import CustomPicker from '../components/CustomPicker'
import {Picker} from '@react-native-picker/picker'
import { GuruSignupInterface } from '../classes/guru'
import { SiswaSignupInterface } from '../classes/siswa'
import AuthContext from '../hooks/AuthContext'
import styles from '../styles/Login'

export const roleEnum = {
    guru: 'GURU',
    siswa: 'SISWA'
}

const Login = ({navigation}) => {
    const [namaLengkap, setNamaLengkap] = useState('')
    const [NIS, setNIS] = useState('')
    const [telepon, setTelepon] = useState()
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(roleEnum.siswa)
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const {signUpGuru,signUpSiswa} = useContext(AuthContext)

    const onRoleChange = v => {
        setRole(v)
    }
    
    const onNamaLengkapChange = (v) => {
        setNamaLengkap(v)
    }

    const onNISChange = (v) => {
        setNIS(v)
    }

    const onEmailChange = (v) => {
        setEmail(v)
    }

    const onTeleponChange = (v) => {
        setTelepon(v)
    }

    const onPasswordChange = (v) => {
        setPassword(v)
    }

    const onPasswordConfirmationChange = (v) => {
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
        if (password !== confirmationPassword) return createSignupErrorAlert()
        if (!namaLengkap || !email || !password) {
            return;
        }
        // Do Things

        try {
            if (role === roleEnum.guru) {
                if (!telepon) return;
                const guruSignupInterface = new GuruSignupInterface(namaLengkap, email, password, telepon)
                const guruSignupObject = guruSignupInterface.publicData()
                signUpGuru(guruSignupObject)
            } else if (role === roleEnum.siswa) {
                // if (!NIS) return;
                // const SiswaSignup = new SiswaSignupInterface(namaLengkap, NIS, email, pass)
            }


        } catch (error) {
            
        }
    }

    return (
        <WithStatusBarMargin>
            <ScrollView>
                <View style={styles.container}>
                    <Title>Signup</Title>
                    <Card style={styles.firstCard}>
                        <Input
                            placeholder={'Nama Lengkap'}
                            onChangeText={onNamaLengkapChange}
                        />
                        {
                            role === roleEnum.siswa
                            ? <Input
                            placeholder={'NIS'}
                            onChangeText={onNISChange}
                            />
                            : null
                        }

                        <Input
                            placeholder={'Email'}
                            onChangeText={onEmailChange}
                        />

                        {
                            role === roleEnum.guru
                            ? <Input
                            keyboardType='number-pad'
                            placeholder={'Telepon'}
                            onChangeText={onTeleponChange}
                            />
                            : null
                        }

                        <CustomPicker selectedValue={role} onValueChange={onRoleChange}>
                            <Picker.Item label={'Siswa'} value={roleEnum.siswa} />
                            <Picker.Item label={'Guru'} value={roleEnum.guru} />
                        </CustomPicker>

                        {/* {
                            role === roleEnum.siswa
                            ? <CustomPicker selectedValue={role} onValueChange={onRoleChange}>
                            <Picker.Item label={'X'} value={roleEnum.siswa} />
                            <Picker.Item label={'XI'} value={roleEnum.guru} />
                            <Picker.Item label={'XII'} value={roleEnum.guru} />
                        </CustomPicker>
                            : null
                        } */}

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
                        <Button disabled={submitted} text={'Daftar'} style={styles.loginBtn} onPress={onSignupButtonPressed}/>
                        <SemiSlashThrough style={styles.atau} text={'ATAU'} />
                        <CustomLink text={'Lupa kata sandi?'} />
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