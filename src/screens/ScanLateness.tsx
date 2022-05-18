import { FontAwesome } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import { InsertLatenessParamList } from '../navigation/InsertLateness'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { Camera } from 'expo-camera'
import { ActivityIndicator, Portal, Modal, Provider, TextInput } from 'react-native-paper'
import { useLazyGetStudentByNisQuery } from '../services/student'
import Button from '../components/Button'
import { Purposes, usePostLatenessMutation } from '../services/lateness'
import NotificationSnack from '../components/NotificationSnack'
import { Picker } from '@react-native-picker/picker'
import textInputHandler from '../utils/textInputHandler'

type ScreenProps = CompositeScreenProps<
    DrawerScreenProps<TeacherHomeStackParamList, 'LatenessStatistic'>,
    NativeStackScreenProps<InsertLatenessParamList, 'Manual'>
>

const useCounter = (): [number, () => void] => {
    const [count, setCount] = useState(0)
    const increase = () => {
        setCount(prev => prev + 1)
    }
    return [count, increase]
}

const ScanLateness: React.FC<ScreenProps> = ({ navigation }) => {
    const [isPaused, setIsPaused] = useState(false)
    const [getStudent, {
        isLoading: isFetchStudentLoading,
        isSuccess: isFetchStudentSuccess,
        isError: isFetchStudentError,
        error: fetchStudentError,
        data: fetchStudentData
    }] = useLazyGetStudentByNisQuery()
    const [postLateness, {
        isLoading: isPostLatenessLoading,
        isSuccess: isPostLatenessSuccess,
        error: postLatenessError
    }] = usePostLatenessMutation()
    const [hasPermission, setHasPermission] = useState<boolean>()
    const [count, increase] = useCounter()
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [purpose, setPurpose] = useState(Purposes.TidakAda)
    const fetchStudentErrorMessage = useRef('')
    const postLatenessErrorMessage = useRef('')
    const qrpayload = useRef('')

    const onBackButton = () => {
        navigation.pop()
    }

    const onSnackbarDismiss = () => {
        setSnackbarVisible(false)
    }

    const handleModalDismiss = () => {
        setModalVisible(false)
        setIsPaused(false)
    }

    const handleBarcodeScan: BarCodeScannedCallback = useCallback(async (scanResult) => {
        increase()
        setIsPaused(true)
        qrpayload.current = scanResult.data
        try {
            const fetchingStudent = getStudent(scanResult.data).unwrap()
            setModalVisible(true)
            await fetchingStudent
        } catch (error: any) {
            if (!!error.status && !!error.data) {
                fetchStudentErrorMessage.current = error.data.message
            } else {
                fetchStudentErrorMessage.current = 'Kode qr tidak valid. coba absen secara manual'
            }
        }
    }, [])

    const handlePostLateness = useCallback(async () => {
        try {
            await postLateness({ nis: qrpayload.current, purpose: Purposes.TidakAda }).unwrap()
            handleModalDismiss()
        } catch (error: any) {
            if (!!error.data && !!error.status && !!error.data.message) {
                postLatenessErrorMessage.current = error.data.message
            } else {
                postLatenessErrorMessage.current = 'Gagal mengabsen harap coba lagi nanti'
            }
        } finally {
            setSnackbarVisible(true)
        }

    }, [qrpayload.current])


    useEffect(() => {
        increase()
        {
            (async () => {
                const { granted } = await Camera.requestCameraPermissionsAsync()
                setHasPermission(granted)
            })()
        }
    }, [])

    if (hasPermission === undefined) {
        return <View />
    }

    if (!hasPermission) {
        return <View>
            <Typography>Tidak memiliki izin kamera</Typography>
        </View>
    }

    return (
        <>

            <Provider>
                <View style={styles.container}>
                    <Portal>
                        <Modal
                            style={styles.modalContainer}
                            contentContainerStyle={styles.modalContentContainer}
                            visible={modalVisible}
                            dismissable={isFetchStudentLoading ? false : true}
                            onDismiss={handleModalDismiss}
                        >
                            {
                                isFetchStudentLoading
                                    ? <ActivityIndicator color={styleGuide.colorLightGray} size={styleGuide.fontBig} />
                                    : isFetchStudentError
                                        ? <View>
                                            <Typography>Qrcode tidak valid</Typography>
                                            <Button onPress={handleModalDismiss}>Ok</Button>
                                        </View>
                                        : <View style={styles.modalStudentDataContainer}>
                                            <Typography type='title' style={styles.modalStudentDataTitle}>Absen</Typography>
                                            <TextInput
                                                disabled
                                                label='Nis'
                                                mode='outlined'
                                                value={fetchStudentData?.nis}
                                                autoComplete={false}
                                            />
                                            <TextInput
                                                disabled
                                                label='Nama'
                                                mode='outlined'
                                                value={fetchStudentData?.namaLengkap}
                                                autoComplete={false}
                                            />
                                            <TextInput
                                                disabled
                                                label='Kelas'
                                                mode='outlined'
                                                value={fetchStudentData?.fullClass}
                                                autoComplete={false}
                                            />
                                            <Typography type='tiny'>Alasan</Typography>
                                            <Picker
                                                selectedValue={purpose}
                                                onValueChange={textInputHandler(setPurpose)}
                                            >
                                                {Object.values(Purposes).map((p) => {
                                                    return <Picker.Item key={p} value={p} label={p} />
                                                })}
                                            </Picker>
                                            <Button
                                                disabled={isPostLatenessLoading}
                                                onPress={handlePostLateness}
                                                style={styles.modalConfirmationButton}
                                            >
                                                {
                                                    isPostLatenessLoading
                                                        ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorWhite} />
                                                        : 'Konfirmasi'
                                                }
                                            </Button>
                                        </View>
                            }
                        </Modal>

                        <NotificationSnack
                            onDismiss={onSnackbarDismiss}
                            visible={snackbarVisible}
                            isSuccess={isPostLatenessSuccess}
                            successMessage='Berhasil menginput'
                            errorMessage={postLatenessErrorMessage.current}
                        >

                        </NotificationSnack>
                    </Portal>
                    <View style={styles.screenHeader}>
                        <TouchableOpacity style={styles.headerBackButton} onPress={onBackButton}>
                            <FontAwesome name='angle-left' size={styleGuide.fontBig} />
                        </TouchableOpacity>
                        <Typography type='title'>Kode QR</Typography>
                    </View>
                    {/* <BarCodeScanner
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                        onBarCodeScanned={isPaused ? undefined : handleBarcodeScan}
                    >

                    </BarCodeScanner> */}
                    <Camera
                        key={count}
                        style={styles.qrcodeCameraContainer}
                        ratio='16:9'
                        onBarCodeScanned={isPaused ? undefined : handleBarcodeScan}
                        barCodeScannerSettings={[BarCodeScanner.Constants.BarCodeType.qr]}
                    >

                    </Camera>

                </View >
            </Provider>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    screenHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    headerBackButton: {
        paddingHorizontal: 20,
    },
    qrcodeCameraContainer: {
        flexGrow: 1
    },
    qrcodeOverlap: {
        backgroundColor: styleGuide.colorBlack,
        opacity: .5
    },
    modalContainer: {
        padding: 10,
        justifyContent: 'center'
    },
    modalContentContainer: {
        backgroundColor: 'white',
        padding: 20,
        alignSelf: 'center',
        borderRadius: 20
    },
    modalStudentDataContainer: {
        width: 250
    },
    modalStudentDataTitle: {
        marginBottom: 10
    },
    modalConfirmationButton: {
        marginTop: 20
    }
})

export default ScanLateness