import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import styleGuide from '../constants/styleGuide'
import Typography from './Typography'

interface Props {
    label: string,
    onToggle?: () => void,
    onToggleExit?: () => void
}

const ToggleButton: React.FC<Props> = ({ label, onToggle = () => { }, onToggleExit = () => { } }) => {
    const [focused, setFocused] = useState(false)
    const isFirstTime = useRef(true)
    const onPress = () => {
        setFocused(!setFocused)
    }

    useEffect(() => {
        if (isFirstTime.current) {
            isFirstTime.current = false
            return
        }

        if (focused) {
            onToggle()
        } else {
            onToggleExit()
        }

    }, [focused])



    return (
        <View style={[styles.container, focused && styles.checked]}>
            <TouchableOpacity onPress={onPress}>
                <Typography type='tiny' style={styles.label}>{label}</Typography>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10000,
        borderWidth: 1,
        borderColor: styleGuide.colorPrimary
    },
    checked: {
        borderWidth: 0,
        backgroundColor: styleGuide.colorPrimary,
        color: styleGuide.colorWhite
    },
    label: {
        textAlign: 'center'
    }
})

export default ToggleButton