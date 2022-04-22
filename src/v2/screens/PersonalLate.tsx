import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import Typography from '../components/Typography'
import DatePicker from '../components/DatePicker'
import useCurrentDate from '../hooks/useCurrentDate'
import Card from '../components/Card'
import { DisplayLateForPersonal } from '../components/Late'
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StudentLateStackParamList } from '../types/navigation'

export type PersonalLateScreenProps = NativeStackScreenProps<StudentLateStackParamList, 'LateHome'>

interface Props extends PersonalLateScreenProps {

}

const PersonalLate: React.FC<Props> = ({ navigation }) => {
    const { year, month, setYear, setMonth } = useCurrentDate()

    const onLateButtonPressed = (date: Date) => {
        return () => {
            navigation.navigate('LateDetail', { date })
        }
    }

    return (
        <Classic
            header={{
                title: 'Keterlambatan',
                icon: <FontAwesome name='calendar' size={96} color={styleGuide.colorSecondary} />
            }}
        >
            <ClassicBodyHeader>
                <Typography type='title'>Pilih Bulan</Typography>
                <DatePicker
                    choose='month'
                    year={year}
                    month={month}
                    setYear={setYear}
                    setMonth={setMonth}
                />
            </ClassicBodyHeader>
            <ClassicBodyContents>
                <DisplayLateForPersonal
                    date={new Date(2022, 3, 21)}
                    isWarning={false}
                    onPress={onLateButtonPressed(new Date(2022, 3, 21))}
                />
                <DisplayLateForPersonal
                    date={new Date(2022, 3, 11)}
                    isWarning={false}
                    onPress={onLateButtonPressed(new Date(2022, 3, 21))}
                />
                <DisplayLateForPersonal
                    date={new Date(2022, 1, 16)}
                    isWarning={true}
                />
                <DisplayLateForPersonal
                    date={new Date(2022, 1, 6)}
                    isWarning={false}
                    onPress={onLateButtonPressed(new Date(2022, 3, 21))}
                />
                <DisplayLateForPersonal
                    date={new Date(2022, 1, 5)}
                    isWarning={false}
                    onPress={onLateButtonPressed(new Date(2022, 3, 21))}

                />
            </ClassicBodyContents>

        </Classic>
    )
}

const styles = StyleSheet.create({

})

export default PersonalLate