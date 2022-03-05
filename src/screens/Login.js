import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import WithStatusBarMargin from '../components/WithStatusBarMargin'
import Title from '../components/Title'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import SemiSlashThrough from '../components/SemiSlashThrough'
import CustomLink from '../components/CustomLink'
import FormSecondaryCard from '../components/FormSecondaryCard'
import styles from '../styles/Login'

const Login = ({navigation}) => {
    const [emailOrNis, setEmailOrNis] = useState('')
    const [password, setPassword] = useState('')

    const onUserIdentifierChange = (value) => {
        setEmailOrNis(value)
    }

    const onPasswordChange = (value) => {
        setPassword(value)
    }

    

    return (
        <WithStatusBarMargin>
            <View style={styles.container}>
                <Title>Login</Title>
                <Card style={styles.firstCard}>
                    <Input
                        placeholder={'Email / NIS'}
                        onChangeText={onUserIdentifierChange}
                    />
                    <Input
                        hint={'Password Harus Memiliki Setidaknya 8 Huruf'}
                        placeholder={'Password'}
                        onChangeText={onPasswordChange}
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
        </WithStatusBarMargin>
    )
}

export default Login