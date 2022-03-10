import React, { useContext} from 'react'
import { View, Text } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import AuthContext from '../hooks/AuthContext'

const AccountDetails = () => {
    const {signOut} = useContext(AuthContext)

    return (
        <LightBlueScreen>
            <Text onPress={() => {signOut()}}>Detail Screen</Text>
        </LightBlueScreen>
    )
}

export default AccountDetails