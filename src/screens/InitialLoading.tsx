import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import VAR from '../styles/VAR'

const InitialLoading: React.FC = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator
                color={VAR.darkBlue}
                size={32}
            />
        </View>
    )
}

export default InitialLoading