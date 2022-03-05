import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView } from 'react-native'
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
import styles from '../styles/Login'

const roleEnum = {
    guru: 'GURU',
    siswa: 'SISWA'
}

const Login = ({navigation}) => {
    const [namaLengkap, setNamaLengkap] = useState('')
    const [NIS, setNIS] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(roleEnum.siswa)
    const [password, setPassword] = useState('')

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

    const onPasswordChange = (v) => {
        setPassword(v)
    }

    const onPasswordConfirmationChange = (v) => {
        setPassword(v)
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
                        <Input
                            placeholder={'NIS'}
                            onChangeText={onNISChange}
                        />
                        <Input
                            placeholder={'Email'}
                            onChangeText={onEmailChange}
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
                        <Input
                            placeholder={'Konfirmasi Password'}
                            onChangeText={onPasswordConfirmationChange}
                        />
                        <Button text={'Masuk'} style={styles.loginBtn}/>
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