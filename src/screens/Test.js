import React, {useState} from 'react'
import { View, Text } from 'react-native'

const Test = ({navigation}) => {
    const [count, setCount] = useState(0)

    const onPress = () => {
        navigation.navigate('GuruHome')
    }
    const inc = () => {
        setCount(count + 1)
    }
    const dec = () => {
        setCount(count - 1)
    }
    
    return (
        <View>
            <Text onPress={onPress}>Hi Test</Text>
            <Text onPress={inc}>+</Text>
            <Text>{count}</Text>
            <Text onPress={dec}>-</Text>
        </View>
    )
}

export default Test