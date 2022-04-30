import { Picker, } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import styleGuide from '../constants/styleGuide'
import { Purposes, usePostLatenessMutation, } from '../services/lateness'
import { Student } from '../services/student'
import sleep from '../utils/sleep'
import Button from './Button'
import Modal, { Props as ModalProps } from './Modal'
import TextInput from './TextInput'
import Typography from './Typography'

export interface Props extends ModalProps {
    nis: string,
    name: string,
    fullClass: string
}

const AddLatenessModal: React.FC<Props> = ({ closeModal, visible, nis, name, fullClass }) => {
    const [postLateness] = usePostLatenessMutation()
    const [isLoading, setIsLoading] = useState(false)
    const [purpose, setPurpose] = useState<Purposes>(Purposes.TidakAda)

    const onConfirm = () => {
        (async () => {
            setIsLoading(true)
            const posting = postLateness({ nis })
            await sleep(500)
            const response = await posting
            setIsLoading(false)
            setPurpose(Purposes.TidakAda)
            closeWithCleanup()
        })()
    }

    const closeWithCleanup = () => {
        setPurpose(Purposes.TidakAda)
        closeModal()
    }

    return (
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
            <Button onPress={onConfirm}>{isLoading ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} /> : 'Konfirmasi'}</Button>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: '80%'
    },
    inputStyle: {
        height: 60
    },
    infoContainer: {
        flex: 1
    }
})

export default AddLatenessModal