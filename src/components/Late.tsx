import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Typography from './Typography'
import Card from './Card'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import formatStringDate from '../utils/formatStringDate'
import { useNavigation } from '@react-navigation/native'
import { PersonalLateScreenProps } from '../screens/PersonalLate'


interface DisplayForPersonalProps {
    date: Date,
    isWarning: boolean,
    onPress?: () => void
}

export const DisplayLateForPersonal: React.FC<DisplayForPersonalProps> = ({ isWarning, date, onPress }) => {
    const formattedStringDate = formatStringDate(date)

    return (
        <Card style={displayLateForPersonalStyles.container}>
            <TouchableOpacity style={displayLateForPersonalStyles.detailButton} onPress={onPress}>
                <View style={displayLateForPersonalStyles.bodyContainer}>
                    <Typography type='body' style={displayLateForPersonalStyles.dateText}>{formattedStringDate}</Typography>
                    {
                        isWarning &&
                        <Typography type='tiny'>
                            <FontAwesome color={styleGuide.colorWarning} name='exclamation-triangle' size={16} />
                            &nbsp;Belum diberi alasan
                        </Typography>
                    }
                </View>
                <FontAwesome size={24} name='angle-right' color={styleGuide.colorTertiary} />
            </TouchableOpacity>
        </Card>
    )
}

const displayLateForPersonalStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20
    },
    bodyContainer: {
        flexGrow: 1
    },
    dateText: {
        color: styleGuide.colorTertiary
    },
    warningText: {
        marginTop: 5
    },
    detailButton: {
        flexDirection: 'row',
        flexGrow: 1
    }
})
