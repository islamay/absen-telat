import React, { useState } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import Typography from '../components/Typography'
import DatePicker from '../components/DatePicker'
import useCurrentDate from '../hooks/useCurrentDate'
import { DisplayLateForPersonal } from '../components/Late'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StudentHomeStackParamList } from '../navigation/StudentHome'
import { StudentStackParamList } from '../navigation/Student'
import { ILateness, useGetLatenessByNisQuery } from '../services/lateness'
import { useAppSelector } from '../hooks/redux'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { CompositeScreenProps } from '@react-navigation/native'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'

export type PersonalLateScreenProps = CompositeScreenProps<
    NativeStackScreenProps<StudentStackParamList, 'HomeStack'>,
    MaterialBottomTabScreenProps<StudentHomeStackParamList, 'Late'>
>

interface Props extends PersonalLateScreenProps {

}

const PersonalLate: React.FC<Props> = ({ navigation }) => {
    const student = useAppSelector(state => state.student)
    const { week, setWeek, year, setYear, month, setMonth, date, setDate } = useCurrentDate()
    const { data, isLoading, refetch } = useGetLatenessByNisQuery({ nis: student.nis, page: 1, limit: 1000, year, month })

    const onLateButtonPressed = (lateness: ILateness) => {
        return () => navigation.push('LatenessDetail', { id: lateness._id })
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
                    date={date}
                    year={year}
                    month={month}
                    week={week}
                    setDate={setDate}
                    setYear={setYear}
                    setWeek={setWeek}
                    setMonth={setMonth}
                />
            </ClassicBodyHeader>
            <ClassicBodyContents withScrollView={false}>
                <FlatList
                    style={{ flex: 1 }}
                    data={data}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refetch}
                        />
                    }
                    renderItem={({ item }) => {
                        return (
                            <DisplayLateForPersonal
                                key={item._id}
                                date={new Date(item.date)}
                                isWarning={!item.alasan}
                                onPress={onLateButtonPressed(item)}
                            />
                        )
                    }}
                />
            </ClassicBodyContents>

        </Classic>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20
    }
})

export default PersonalLate