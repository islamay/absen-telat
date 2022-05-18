import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import styleGuide from '../constants/styleGuide'
import { View, StyleSheet } from 'react-native'
import Clean, { CleanHeader } from '../layout/Clean'
import type { TeacherStackParamList } from '../navigation/Teacher'
import { useGetLatenessByIdQuery, Purposes, usePatchLatenessPurposeByIdMutation } from '../services/lateness'
import { FontAwesome } from '@expo/vector-icons'
import Typography from '../components/Typography'
import TextInput from '../components/TextInput'
import formatStringDate from '../utils/formatStringDate'
import { Picker } from '@react-native-picker/picker'
import Button from '../components/Button'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
import { ErrorResponse } from '../constants/api'
import sleep from '../utils/sleep'

type ScreenProps = NativeStackScreenProps<TeacherStackParamList, 'LatenessDetail'>

const LatenessDetail: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { isLoading, isSuccess, isError, data, error } = useGetLatenessByIdQuery(route.params.id)
    const [patchLateness] = usePatchLatenessPurposeByIdMutation()
    const [purpose, setPurpose] = useState(Purposes.TidakAda)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const showUpdateButton = purpose !== data?.alasan
    const [updateInfo, setUpdateInfo] = useState<{ isSuccess: boolean, isError: boolean, error: ErrorResponse | undefined, isLoading: boolean }>({ isError: false, isSuccess: false, error: undefined, isLoading: false })

    const handlePurposeChange = (v: Purposes) => {
        setPurpose(v)
    }

    const handleUpdate = () => {
        (async () => {

            try {
                setUpdateInfo(prev => ({ ...prev, isLoading: true }))
                const updating = patchLateness({ id: data?._id || '', purpose }).unwrap()
                await sleep(500)
                const result = await updating
                setSnackbarVisible(true)
                setUpdateInfo(prev => ({ ...prev, isError: false, isSuccess: true }))
            } catch (error: any) {
                setUpdateInfo(prev => ({ ...prev, isError: true, isSuccess: false }))
                if (typeof error === 'object' && error.status && error.data) {
                    setUpdateInfo(prev => ({ ...prev, error: error.data }))
                }
            } finally {
                setUpdateInfo(prev => ({ ...prev, isLoading: false }))
            }

        })()
    }

    useEffect(() => {
        setPurpose(data?.alasan || Purposes.TidakAda)
    }, [data])

    return (
        <Clean scrollable={true}>
            <CleanHeader
                title='Detail Keterlambatan'
                withBackButton={true}
            />

            <View>
                <FontAwesome
                    name='file'
                    size={96}
                    color={styleGuide.colorSecondary}
                    style={styles.icon}
                />
                {
                    !isLoading && (isSuccess
                        ? (
                            <View style={styles.infoContainer}>
                                <TextInput
                                    mode='outlined'
                                    disabled
                                    label='Tanggal'
                                    value={formatStringDate(new Date(data.date))}
                                />
                                <TextInput
                                    mode='outlined'
                                    disabled
                                    label='Nis'
                                    value={data.nis}
                                />
                                <TextInput
                                    mode='outlined'
                                    disabled
                                    label='Nama'
                                    value={route.params.name}
                                />
                                <Typography>Alasan</Typography>
                                <Picker
                                    selectedValue={purpose}
                                    onValueChange={handlePurposeChange}
                                >
                                    {
                                        Object.values(Purposes).map(v => (
                                            <Picker.Item
                                                key={v}
                                                label={v}
                                                value={v}
                                            />
                                        ))
                                    }
                                </Picker>

                                {
                                    !snackbarVisible && showUpdateButton && (
                                        <Button onPress={handleUpdate} style={styles.updateButton}>
                                            {updateInfo.isLoading
                                                ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                                                : 'Update'
                                            }
                                        </Button>
                                    )
                                }


                            </View>
                        )
                        : <Typography>Dokumen tidak ditemukan</Typography>
                    )
                }
                <View>

                </View>
            </View>
            <Snackbar
                style={styles.snackbar}
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                theme={{ colors: { onSurface: isSuccess ? styleGuide.colorPrimary : styleGuide.colorDanger } }}
            >
                {isSuccess ? 'Berhasil mengupdate' : updateInfo.error?.message || 'Gagal mengupdate'}
            </Snackbar>

        </Clean>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center'
    },
    infoContainer: {
        padding: 50
    },
    updateButton: {
        marginTop: 10
    },
    snackbar: {
        position: 'absolute',
        bottom: 10
    }
})

export default LatenessDetail