import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DefaultModal, { Props as DefaultModalProps, Gap } from './DefaultModal'
import Input from './Input'
import Button from './Button'
import styles from '../styles/SiswaAccountModal'

interface Props extends DefaultModalProps {
    nis: string,
    fullName: string,
    fullClass: string,
    status: string
}

const SiswaAccountModal: React.FC<Props> = ({ nis, fullName, fullClass, status, visible, closeModal }) => {
    const [newStatus, setNewStatus] = useState('')
    const validStatus = newStatus === 'AKTIF' || newStatus === 'MENUNGGU'

    const onNewStatusChange = (v: string) => {
        setNewStatus(v)
    }

    const onConfirmationButtonPressed = () => {

    }

    const closeWithCleanup = () => {
        setNewStatus('')
        closeModal()
    }

    return (
        <DefaultModal
            visible={visible}
            closeModal={closeWithCleanup}
        >
            <View style={styles.box}>
                <Text style={styles.header}>Nis : <Text style={styles.content}>{nis}</Text></Text>
                <Text style={styles.header}>Nama : <Text style={styles.content}>{fullName}</Text></Text>
                <Text style={styles.header}>Kelas : <Text style={styles.content}>{fullClass}</Text></Text>
                <Text style={styles.header}>Status : <Text style={styles.content}>{status}</Text></Text>
            </View>

            <Gap />

            <Input
                hint='Ketik AKTIF atau MENUNGGU'
                placeholder='Status Akun...'
                onChangeText={onNewStatusChange}
            />

            <Gap />

            <Button
                text='Batal'
                onPress={closeWithCleanup}
            />

            <Button
                style={{ marginTop: 10 }}
                text='Update Akun'
                onPress={onConfirmationButtonPressed}
                disabled={!validStatus}
            />


        </DefaultModal>
    )
}

export default SiswaAccountModal
