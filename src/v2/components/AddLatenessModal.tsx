import { Picker, } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
import { QueryInfo } from '../constants/queryInfo'
import styleGuide from '../constants/styleGuide'
import { Purposes, usePostLatenessMutation, } from '../services/lateness'
import { Student } from '../services/student'
import sleep from '../utils/sleep'
import Button from './Button'
import Modal, { Props as ModalProps } from './Modal'
import TextInput from './TextInput'
import Typography from './Typography'
import { ErrorResponse } from '../constants/api'

export interface Props extends ModalProps {
    nis: string,
    name: string,
    fullClass: string
}

const AddLatenessModal: React.FC<Props> = ({ closeModal, visible, nis, name, fullClass }) => {
    const [postLateness, { isSuccess, isError, error }] = usePostLatenessMutation()
    const [isLoading, setIsLoading] = useState(false)
    const [purpose, setPurpose] = useState<Purposes>(Purposes.TidakAda)
    const [postInfo, setPostInfo] = useState<{ isSuccess: boolean, isError: boolean, error: ErrorResponse | undefined }>({ isError: false, isSuccess: false, error: undefined })
    const [snackbarVisible, setSnackbarVisible] = useState(false)

    const onConfirm = () => {
        (async () => {
            try {
                setIsLoading(true)
                const posting = postLateness({ nis, purpose }).unwrap()
                await sleep(500)
                await posting
                setPostInfo({ isError: false, isSuccess: true, error: undefined })
                setIsLoading(false)
                setSnackbarVisible(true)
            } catch (error: any) {
                setPostInfo({ isSuccess: false, isError: true, error: undefined })
                if (error.status && error.data) {
                    setPostInfo(prev => ({ ...prev, error: error.data }))
                }
            } finally {
                closeModal()
                setIsLoading(false)
                setPurpose(Purposes.TidakAda)
                setSnackbarVisible(true)
            }

        })()
    }


    const onDismissSnackbar = () => {
        setSnackbarVisible(false)
        cleanUp()
    }

    const cleanUp = () => {
        setPurpose(Purposes.TidakAda)
        setPostInfo({ error: undefined, isError: false, isSuccess: false })

    }

    const closeWithCleanup = () => {
        cleanUp()
        closeModal()
    }

    return (
        <>
            <Modal style={styles.container} visible={visible} closeModal={closeWithCleanup}>

                <Typography type='title'>Input Keterlambatan</Typography>
                <View style={styles.infoContainer}>
                    <TextInput
                        mode='outlined'
                        label='Nis'
                        value={nis}
                        disabled
                        style={styles.inputStyle}
                    />
                    <TextInput
                        mode='outlined'
                        label='Nama'
                        value={name}
                        disabled
                        style={styles.inputStyle}
                    />
                    <TextInput
                        mode='outlined'
                        label='Kelas'
                        value={fullClass}
                        disabled
                        style={styles.inputStyle}
                    />
                    <Typography>Alasan</Typography>
                    <Picker
                        mode='dialog'
                        selectedValue={purpose}
                        onValueChange={v => setPurpose(v)}
                    >
                        {
                            Object.values(Purposes).map(v => (
                                <Picker.Item value={v} key={v} label={v} />
                            ))
                        }

                    </Picker>
                </View>
                <Button style={styles.button} disabled={isLoading} onPress={onConfirm}>{isLoading ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} /> : 'Konfirmasi'}</Button>


            </Modal>
            <Snackbar
                style={styles.snackbar}
                duration={10000}
                visible={snackbarVisible}
                onDismiss={onDismissSnackbar}
                theme={{ colors: { onSurface: postInfo.isSuccess ? styleGuide.colorPrimary : styleGuide.colorDanger } }}
            >
                {
                    postInfo.isSuccess ? 'Berhasil menginput' : postInfo.error?.message || 'Gagal menginput'
                }
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: '80%'
    },
    errorContainer: {
        minHeight: 200,
        width: '80%'
    },
    inputStyle: {
        height: 60
    },
    infoContainer: {
        flex: 1
    },
    errorMessage: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    button: {
        ...styleGuide.shadow
    },
    snackbar: {
        position: 'absolute',
        bottom: 10
    }
})

export default AddLatenessModal