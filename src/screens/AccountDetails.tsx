import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import { useDispatch } from 'react-redux'
import userData from '../store/userData'

const AccountDetails = () => {
    const dispatch = useDispatch()

    return (
        <LightBlueScreen>
            <Text onPress={() => { dispatch(userData.actions.wipeData()) }}>Logout</Text>
        </LightBlueScreen>
    )
}

export default AccountDetails