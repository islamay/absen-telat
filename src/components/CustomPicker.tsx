import React from 'react'
import { View, Text  } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import styles from '../styles/CustomPicker'

const CustomPicker = ({children, selectedValue, onValueChange}) => {


    return (
        <View style={styles.container}>
            <Picker selectedValue={selectedValue} onValueChange={onValueChange} >
                {children}
            </Picker>
        </View>
    )
}

export default CustomPicker
