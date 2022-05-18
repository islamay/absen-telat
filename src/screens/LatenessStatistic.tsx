import { FontAwesome } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useMemo } from 'react'
import { StyleSheet, Touchable, View } from 'react-native'
import { ActivityIndicator, FAB, Modal, Portal, Provider, RadioButton } from 'react-native-paper'
import Card from '../components/Card'
import DatePicker from '../components/DatePicker'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import useCurrentDate from '../hooks/useCurrentDate'
import useToggle from '../hooks/useToggle'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { TeacherStackParamList } from '../navigation/Teacher'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { useGetLatenessesQuery } from '../services/lateness'
import { endOfMonth, firstOfMonth } from '../utils/date'
import Button from '../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StatisticFilter from '../components/StatisticFilter'
import useDownloadLatenessReport, { excelMimeType } from '../hooks/useDownloadLatenessReport'
import NewModal from '../components/NewModal'
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    DrawerScreenProps<TeacherHomeStackParamList, 'LatenessStatistic'>
>;


const LatenessStatistic: React.FC<ScreenProps> = ({ navigation }) => {
    const [fabOpen, toggleFabOpen] = useToggle(false)
    const [filterOpen, toggleFilter] = useToggle(false)
    const [reportTime, setReportTime] = useState<'Bulanan' | 'Mingguan' | 'Harian' | string>('Bulanan')
    const { dateObject, date, week, month, year, setDate, setWeek, setMonth, setYear } = useCurrentDate()
    const [modalVisible, setModalVisible] = useState(false)
    const startAndEndDate = useMemo(() => {
        return {
            start: firstOfMonth(dateObject).toISOString().split('.')[0],
            end: endOfMonth(dateObject).toISOString().split('.')[0]
        }
    }, [dateObject])
    const { data, isLoading, isSuccess, isError } = useGetLatenessesQuery({
        start: startAndEndDate.start,
        end: startAndEndDate.end
    })
    const {
        download: downloadReport,
        isLoading: isDownloadReportLoading,
        isSuccess: isDownloadReportSuccess,
        isError: isDownloadReportError,
        fileContentUri
    } = useDownloadLatenessReport()

    const handleDownloadReport = () => {
        setModalVisible(true)
        downloadReport(startAndEndDate.start, startAndEndDate.end)
    }

    const handleModalDismiss = () => {
        setModalVisible(false)
    }

    const handlePreviewDownloadedFile = () => {
        startActivityAsync('android.intent.action.VIEW', {
            flags: 1,
            data: fileContentUri,
            type: excelMimeType
        })
    }

    return (
        <Provider>
            <Portal>
                <NewModal
                    visible={modalVisible}
                    onDismiss={handleModalDismiss}
                >
                    {
                        isDownloadReportLoading
                            ? <ActivityIndicator style={{ paddingHorizontal: 36 }} size={styleGuide.fontBig} color={styleGuide.colorLightGray} />
                            : isDownloadReportSuccess
                                ? <View>
                                    <Typography>Download berhasil</Typography>
                                    <Button
                                        onPress={handlePreviewDownloadedFile}
                                        style={styles.modalButton}
                                    >
                                        Lihat file
                                    </Button>
                                </View>
                                : <View>
                                    <Typography>Download gagal</Typography>
                                    <Typography>Harap coba lagi beberapa saat</Typography>
                                    <Button style={styles.modalButton} onPress={handleModalDismiss}></Button>
                                </View>
                    }
                </NewModal>
            </Portal>

            <Classic
                header={{
                    title: 'Statistik',
                    subtitle: 'Keterlambatan',
                    icon: <FontAwesome size={96} color={styleGuide.colorSecondary} name='bar-chart' />,
                    navigation: navigation
                }}
            >
                <ClassicBodyHeader>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Typography type='title' style={{ flexGrow: 1 }}>Laporan {reportTime}</Typography>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={toggleFilter}
                        >
                            <FontAwesome name='filter' size={styleGuide.fontBig} color={styleGuide.colorTertiary} />
                            <FontAwesome name={filterOpen ? 'angle-up' : 'angle-down'} size={styleGuide.fontBig} color={styleGuide.colorTertiary} />
                        </TouchableOpacity>
                    </View>
                    {
                        filterOpen &&
                        <StatisticFilter
                            reportTime={reportTime}
                            setReportTime={setReportTime}
                        />
                    }
                    <DatePicker
                        choose={
                            reportTime === 'Bulanan'
                                ? 'month'
                                : reportTime === 'Mingguan'
                                    ? 'week'
                                    : 'day'
                        }
                        date={date}
                        month={month}
                        week={week}
                        year={year}
                        setDate={setDate}
                        setWeek={setWeek}
                        setMonth={setMonth}
                        setYear={setYear}
                    />
                </ClassicBodyHeader>

                <ClassicBodyContents>
                    {
                        isLoading
                            ?
                            <ActivityIndicator
                                size={styleGuide.fontMedium}
                                color={styleGuide.colorGray}
                            />
                            : isSuccess && data
                                ? <>
                                    <Card>
                                        <Typography type='body'>Total
                                            <Typography type='body' style={styles.colorTertiary}>&nbsp;{data.keterlambatan.length + ' Siswa'}</Typography>
                                        </Typography>
                                    </Card>
                                    <Button
                                        disabled={isDownloadReportLoading}
                                        style={styles.downloadButton}
                                        onPress={handleDownloadReport}
                                    >{
                                            isDownloadReportLoading
                                                ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorLightGray} />
                                                : 'Unduh laporan'
                                        }</Button>
                                </>
                                : <Typography type='body'>Error</Typography>

                    }
                </ClassicBodyContents>
                <FAB
                    visible={fabOpen}
                    icon='arrow-down'
                    style={styles.fabStyle}
                    color={styleGuide.colorWhite}
                    onPress={toggleFabOpen}
                />

            </Classic>
        </Provider>
    )
}

const styles = StyleSheet.create({
    downloadButton: {
        marginTop: 10
    },
    colorTertiary: {
        color: styleGuide.colorTertiary
    },
    fabStyle: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: styleGuide.colorPrimary,
    },
    dangerBackground: {
        backgroundColor: styleGuide.colorDanger
    },
    modalButton: {
        marginTop: 16
    }
})

export default LatenessStatistic