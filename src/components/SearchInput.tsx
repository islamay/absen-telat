import React from 'react'
import { View, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import Input from './Input'
import styles from '../styles/SearchInput'

interface Props {
    placeholder: string,
    onChange: (value: string) => void
}

const SearchInput: React.FC<Props> = ({ placeholder, onChange }) => {

    return (
        <View style={styles.container}>
            <Input placeholder={placeholder} onChangeText={onChange} />
        </View>
    )
}

export default SearchInput