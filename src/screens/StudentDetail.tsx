import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View, } from 'react-native'
import TextInput from '../components/TextInput'
import Typography from '../components/Typography'
import { AccountStatus } from '../constants/account'
import styleGuide from '../constants/styleGuide'
import Clean, { CleanHeader } from '../layout/Clean'
import { TeacherStackParamList } from '../navigation/Teacher'
import { useGetStudentByNisQuery, usePatchStudentMutation } from '../services/student'
import { useLazyGetLatenessByNisQuery, ILateness } from '../services/lateness'
import DatePicker from '../components/DatePicker'
import useCurrentDate from '../hooks/useCurrentDate'
import { DisplayLateForPersonal } from '../components/Late'
import { Picker } from '@react-native-picker/picker'
import Button from '../components/Button'
import { ActivityIndicator } from 'react-native-paper'

type ScreenProps = NativeStackScreenProps<TeacherStackParamList, 'StudentDetail'>


const StudentDetail: React.FC<ScreenProps> = ({ navigation, route }) => {
    const [studentStatus, setStudentStatus] = useState(AccountStatus.TIDAK_ADA)
    const [studentEmail, setStudentEmail] = useState('')
    const { data, isLoading, isError, isSuccess } = useGetStudentByNisQuery(route.params.nis)
    const { date, month, year, setDate, setMonth, setYear } = useCurrentDate()
    const [fetchLateness, { data: latenesses }] = useLazyGetLatenessByNisQuery()
    const [patchStudent, { isLoading: updateLoading }] = usePatchStudentMutation()
    const statusPickerItems = useMemo(() => {
        return Object.values(AccountStatus).filter((s) => s !== AccountStatus.TIDAK_ADA).map(s => (
            <Picker.Item key={s} value={s} label={s} />
        ))
    }, [])

    const renderLatenesses = useCallback(({ item }: { item: ILateness }) => {
        return (
            <DisplayLateForPersonal
                isWarning={!item.alasan}
                date={new Date(item.date)}
                onPress={() => {
                    navigation.push('LatenessDetail', { id: item._id, name: data?.namaLengkap || '' })
                }}
            />
        )
    }, [data])

    const handleEditStudent = () => {
        const payload = { nis: route.params.nis }
        if (studentEmail !== data?.account.email) Object.assign(payload, { email: studentEmail })
        if (studentStatus !== data?.account.status) Object.assign(payload, { status: studentStatus })

        patchStudent(payload)
    }

    useEffect(() => {
        if (data) {
            setStudentEmail(data.account.email)
            setStudentStatus(data.account.status)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            fetchLateness({ nis: data.nis, limit: 10000, month: month, year: year })
        }
    }, [data, year, month, date])

    return (
        <Clean scrollable={true}>
            <CleanHeader
                title='Detail Siswa'
                withBackButton={true}
            />
            <View>
                <FontAwesome name='user-circle-o' size={96} color={styleGuide.colorSecondary} style={styles.icon} />

                {
                    data && (!isError ? (
                        <>
                            <View style={styles.infoContainer}>
                                <TextInput
                                    mode='outlined'
                                    label='Nis'
                                    value={data.nis}
                                    disabled
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Nama'
                                    value={data.namaLengkap}
                                    disabled
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Kelas'
                                    value={data.fullClass}
                                    disabled
                                />
                                {
                                    data.account.status === AccountStatus.TIDAK_ADA
                                        ? <Typography type='body' style={styles.centerText}>Siswa ini belum memiliki akun</Typography>
                                        : (
                                            <>
                                                <TextInput
                                                    mode='outlined'
                                                    label='Email'
                                                    value={data.account.email}
                                                    disabled
                                                />
                                                <Typography>Status</Typography>
                                                <Picker
                                                    selectedValue={studentStatus}
                                                    onValueChange={(v) => setStudentStatus(v)}
                                                >
                                                    {statusPickerItems}
                                                </Picker>

                                            </>
                                        )
                                }
                                <Button
                                    disabled={studentStatus === data.account.status}
                                    onPress={handleEditStudent}
                                >
                                    {
                                        updateLoading
                                            ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                                            : 'Konfirmasi edit'
                                    }
                                </Button>
                            </View>
                            <View style={styles.latenessSection}>
                                <Typography type='title'>Keterlambatan</Typography>
                                <DatePicker
                                    choose='month'
                                    year={year}
                                    month={month}
                                    setYear={setYear}
                                    setMonth={setMonth}
                                />
                                {
                                    latenesses && (latenesses.length < 0
                                        ? <Typography style={styles.centerText}>Siswa ini belum pernah terlambat</Typography>
                                        : (
                                            <FlatList
                                                style={styles.latenessList}
                                                nestedScrollEnabled
                                                data={latenesses}
                                                keyExtractor={l => l._id}
                                                renderItem={renderLatenesses}
                                            />
                                        )
                                    )
                                }
                            </View>
                        </>
                    ) : <Typography>Siswa tidak ditemukan</Typography>)
                }
            </View>
        </Clean>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center'
    },
    infoContainer: {
        paddingVertical: 20,
        paddingHorizontal: 50
    },
    textInput: {

    },
    centerText: {
        textAlign: 'center'
    },
    latenessSection: {
        padding: 20,
    },
    latenessList: {
        height: 300

    }
})

export default StudentDetail