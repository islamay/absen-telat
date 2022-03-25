import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import { useDispatch } from 'react-redux'
import auth from '../store/auth'

const AccountDetails = () => {
    const dispatch = useDispatch()

    return (
        <LightBlueScreen>
            <Text onPress={() => { dispatch(auth.actions.signOut()) }}>Logout</Text>
        </LightBlueScreen>
    )
}

export default AccountDetails