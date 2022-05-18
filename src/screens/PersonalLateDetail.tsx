import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme } from 'react-native-paper/lib/typescript/types'
import TextInput, { textInputTheme } from '../components/TextInput'
import styleGuide from '../constants/styleGuide'
import Clean, { CleanHeader } from '../layout/Clean'
import { StudentStackParamList } from '../navigation/Student'
import formatStringDate from '../utils/formatStringDate'
import textInputHandler from '../utils/textInputHandler'
import Button from '../components/Button'
import { usePatchLatenessPurposeByIdPMutation } from '../services/lateness'
import { ActivityIndicator } from 'react-native-paper'
import ErrorModal from '../components/ErrorModal'
import { ErrorResponse } from '../constants/api'

type PersonalLateDetailScreenProps = NativeStackScreenProps<StudentStackParamList, 'LatenessDetail'>;

const PersonalLateDetail: React.FC<PersonalLateDetailScreenProps> = ({ route, navigation }) => {
    const [latenessErrorVisible, setLatenessErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [purpose, setPurpose] = useState(route.params.alasan)
    const showUpdateButton = purpose !== route.params.alasan
    const [patchLateness, { isLoading, isSuccess, data, isError, error }] = usePatchLatenessPurposeByIdPMutation()

    const handleUpdatePurpose = () => {
        patchLateness({ id: route.params._id, purpose })
            .unwrap()
            .catch(() => setLatenessErrorVisible(true))
    }

    useEffect(() => {
        if (isError && error && 'data' in error) {
            setErrorMessage((error.data as ErrorResponse).message)
        }
    }, [isError])

    return (
        <Clean>
            <CleanHeader
                title='Detail keterlambatan'
            />
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

                <View style={styles.inputContainer}>
                    <TextInput
                        mode='outlined'
                        theme={customTheme}
                        label='Tanggal'
                        value={formatStringDate(new Date(route.params.date))}
                        disabled
                    />
                    <TextInput
                        mode='outlined'
                        theme={customTheme}
                        label='Alasan'
                        value={purpose}
                        onChangeText={textInputHandler(setPurpose)}
                    />
                    {
                        showUpdateButton
                        && (
                            <Button onPress={handleUpdatePurpose} disabled={isLoading} style={[styles.button, isSuccess && { display: 'none' }]} >
                                {
                                    isLoading
                                        ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                                        : 'Update alasan'
                                }
                            </Button>
                        )
                    }
                </View>

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