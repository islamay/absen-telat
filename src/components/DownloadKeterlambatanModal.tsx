import React, { useCallback, useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import RNDatePicker from '@react-native-community/datetimepicker'
import dateFormat from '../helpers/dateFormat'
import Button from './Button'
import VAR from '../styles/VAR'
import * as IntentLauncher from 'expo-intent-launcher'
import useDownloadKeterlambatan from '../hooks/useDownloadKeterlambatan'
import { Ionicons } from '@expo/vector-icons';


interface Props extends DefaultModalProps {

}

const DownloadKeterlambatanModal: React.FC<Props> = ({ closeModal, visible }) => {
    const [isDoneViewing, setIsDoneViewing] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [changeFor, setChangeFor] = useState<'start' | 'end'>('start')
    const [isPickerShow, setIsPickerShow] = useState(false)
    const { download, isDownloading, isSuccess, isError, errorMessage, fileContentUri } = useDownloadKeterlambatan()

    const dateChangedHandler = useCallback((event, date: Date | undefined) => {
        if (changeFor === 'start' && date) setStartDate(date)
        else if (date) setEndDate(date)
        setIsPickerShow(false)
    }, [changeFor])

    // This Formatted Value is only for client and not valid for backend
    const formattedStartDate = dateFormat(startDate, true)
    const formattedEndDate = dateFormat(endDate, true)

    const endDateButtonHandler = () => {
        setChangeFor('end')
        setIsPickerShow(true)
    }

    const startDateButtonHandler = () => {
        setChangeFor('start')
        setIsPickerShow(true)
    }

    const downloadButtonHandler = async () => {
        download(startDate, endDate)
    }

    const handleOpenFile = () => {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            flags: 1,
            data: fileContentUri
        })
    }

    const handleBack = () => {
        setIsDoneViewing(true)
    }

    useEffect(() => {
        if (isSuccess === true) {
            setIsDoneViewing(false)
        }
    }, [isSuccess])

    if (isError) {
        Alert.alert('Error', errorMessage, [
            {
                text: 'OK'
            }
        ])
    }

    return (
        <DefaultModal
            closeModal={closeModal}
            visible={visible}
        >
            {
                isPickerShow &&
                <RNDatePicker
                    value={changeFor === 'start' ? startDate : endDate}
                    onChange={dateChangedHandler}
                />
            }

            {
                isSuccess && !isDoneViewing
                    ? <>
                        <Ionicons name="ios-chevron-back" size={24} color={VAR.darkBlue} onPress={handleBack} />
                        <Text>Download Berhasil</Text>
                        <Button
                            style={styles.defaultButton}
                            text='Buka'
                            onPress={handleOpenFile}
                        />
                    </>
                    : <>
                        <View style={styles.row}>
                            <Text>Sesudah : {formattedStartDate}</Text>
                            <Button
                                onPress={startDateButtonHandler}
                                text='Pilih'
                                style={styles.btnStyle}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text>Sebelum : {formattedEndDate}</Text>
                            <Button
                                onPress={endDateButtonHandler}
                                text='Pilih'
                                style={styles.btnStyle}
                            />
                        </View>


                        <Button
                            style={styles.defaultButton}
                            text='Unduh Data'
                            onPress={downloadButtonHandler}
                            disabled={isDownloading}
                        />
                    </>
            }


        </DefaultModal>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    btnStyle: {
        paddingHorizontal: 20,
        backgroundColor: VAR.darkBlue
    },
    defaultButton: {
        marginTop: 40,
        backgroundColor: VAR.darkBlue
    },
})

export default DownloadKeterlambatanModal