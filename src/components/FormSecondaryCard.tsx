import React, {useEffect, useState} from 'react'
import { Text } from 'react-native'
import Card from './Card'
import styles from '../styles/FormSecondaryCard'

const routeEnum = {
    Login: 'Login',
    Signup: 'Signup'
}

const textEnum = {
    Login: 'Belum memiliki akun?',
    Signup: 'Sudah memiliki akun?'
}

const linkTextEnum = {
    Login: 'Buat',
    Signup: 'Login'
}

const WithText = ({navigation, text, linkText, href}) => {
    const onLinkPressed = () => {
        navigation.navigate(href)
    }

    return (
        <Text style={styles.mainText}>
            {text} &nbsp;
            <Text 
                style={styles.linkText}
                onPress={onLinkPressed}
            >
                {linkText}
            </Text>
        </Text>
    )
}

const FormSecondaryCard = ({navigation, style}) => {
    const [currentRoute, setCurrentRoute] = useState('')

    useEffect(() => {
        const navigationState = navigation.getState()
        const navigationIndex = navigationState.index
        setCurrentRoute(navigationState.routeNames[navigationIndex])
    }, [])

    return (
        <Card style={style}>
            {
                currentRoute ===  routeEnum.Login
                // Currently In Login
                ? <WithText href={routeEnum.Signup} text={textEnum.Login} linkText={linkTextEnum.Login} navigation={navigation} />
                : <WithText href={routeEnum.Login} text={textEnum.Signup} linkText={linkTextEnum.Signup} navigation={navigation} />
            }
        </Card>
    )
}

export default FormSecondaryCard