import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { Theme } from 'react-native-paper/lib/typescript/types'
import TextInput, { textInputTheme } from '../components/TextInput'
import styleGuide from '../constants/styleGuide'
import Clean, { CleanHeader } from '../layout/Clean'
import { StudentStackParamList } from '../navigation/Student'
import formatStringDate from '../utils/formatStringDate'
import textInputHandler from '../utils/textInputHandler'
import Button from '../components/Button'
import { ILateness, Purposes, useGetLatenessByIdQuery, usePatchLatenessPurposeByIdMutation } from '../services/lateness'
import { ActivityIndicator } from 'react-native-paper'
import ErrorModal from '../components/ErrorModal'
import { ErrorResponse } from '../constants/api'
import { isLoading } from 'expo-font'
import Typography from '../components/Typography'
import { Picker } from '@react-native-picker/picker'

type PersonalLateDetailScreenProps = NativeStackScreenProps<StudentStackParamList, 'LatenessDetail'>;

const PersonalLateDetail: React.FC<PersonalLateDetailScreenProps> = ({ route, navigation }) => {
    const [latenessErrorVisible, setLatenessErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [lateness, setLateness] = useState<ILateness>({ _id: '', alasan: Purposes.TidakAda, date: '', guruId: '', nis: '' })
    const [patchLateness,
        { isLoading: isUpdating,
            isSuccess: isUpdateSuccess,
            data: updatedLateness,
            isError,
            error
        }] = usePatchLatenessPurposeByIdMutation()
    const { data: initialLateness, isLoading, refetch, isSuccess } = useGetLatenessByIdQuery(route.params.id)
    const showUpdateButton = initialLateness !== lateness
    console.log(showUpdateButton);

    const handleUpdate = () => {
        patchLateness({ id: route.params.id, purpose: lateness.alasan })
            .unwrap()
            .catch(() => setLatenessErrorVisible(true))
    }

    const handlePurposeChange = (v: Purposes) => {
        setLateness(p => ({ ...p, alasan: v }))
    }

    useEffect(() => {
        if (isError && error && 'data' in error) {
            setErrorMessage((error.data as ErrorResponse).message)
        }
    }, [isError])

    useEffect(() => {
        if (initialLateness && initialLateness !== lateness) {
            setLateness(initialLateness)
        } else if (updatedLateness) {
            setLateness(updatedLateness)
        }

    }, [initialLateness, updatedLateness])

    return (
        <Clean
            header={{
                title: 'Data keterlambatan',
                withBackButton: true
            }}
            scrollable={true}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={refetch}
                />
            }
        >
            <View style={styles.container}>
                <ErrorModal
                    visible={latenessErrorVisible}
                    closeModal={() => { setLatenessErrorVisible(false) }}
                    title='Gagal mengupdate'
                    errorMessage={errorMessage}
                    buttons={[
                        { text: 'Ulangi', color: styleGuide.colorTertiary }
                    ]}
                />
                <FontAwesome name='file' color={styleGuide.colorSecondary} size={96} style={styles.icon} />

                {
                    isSuccess
                        ?
                        <View style={styles.inputContainer}>
                            <TextInput
                                mode='outlined'
                                theme={customTheme}
                                label='Tanggal'
                                value={formatStringDate(new Date(lateness.date))}
                                disabled
                            />
                            <Typography>Alasan</Typography>
                            <Picker
                                selectedValue={lateness.alasan}
                                onValueChange={handlePurposeChange}
                            >
                                {
                                    Object.values(Purposes).map((v) => (
                                        <Picker.Item value={v} label={v} />
                                    ))
                                }
                            </Picker>
                            {
                                showUpdateButton
                                && (
                                    <Button onPress={handleUpdate} disabled={isLoading} style={[styles.button]} >

                                        {
                                            isLoading
                                                ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                                                : 'Update alasan'
                                        }
                                    </Button>
                                )
                            }
                        </View>
                        : isLoading
                            ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorLightGray} />
                            : <Typography>Dokumen tidak ditemukan</Typography>
                }


            </View>
        </Clean>
    )
}

const customTheme: Theme = {
    ...textInputTheme,
    colors: {
        ...textInputTheme.colors,
        text: styleGuide.colorTertiary,
        primary: styleGuide.colorSecondary,
        placeholder: styleGuide.colorLightGray
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    icon: {
        marginBottom: 40
    },
    inputContainer: {
        width: '70%'
    },
    button: {
        marginTop: 20
    }
})

export default PersonalLateDetail