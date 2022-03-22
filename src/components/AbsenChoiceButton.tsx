import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import absenChoice from '../helpers/absenChoiceEnum'
import { Feather, Entypo  } from '@expo/vector-icons'
import styles from '../styles/AbsenChoiceButton'
import VAR from '../styles/VAR'

const AbsenChoiceButton = ({method, navigation}) => {

    const onPress = () => {
        navigation.push(method === absenChoice.MANUAL ? 'AbsenManual' : 'AbsenWithScan' )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text}>
                    {
                        method === absenChoice.MANUAL
                        ? 'Absen Dengan Manual'
                        : 'Absen Dengan Scan'
                    }
                </Text>
                <View style={styles.iconContainer}>
                    {
                        method === absenChoice.MANUAL
                        ? <Entypo style={styles.icon} name='pencil' size={VAR.mediumFontSize} color={VAR.darkBlue} />
                        : <Feather style={styles.icon} name='camera' size={VAR.mediumFontSize} color={VAR.darkBlue} />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AbsenChoiceButton
