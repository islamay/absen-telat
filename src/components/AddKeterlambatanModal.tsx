import React, { useState } from 'react'
import styles from '../styles/AddKeterlambatanModal'
import DisplaySiswaData from './DisplaySiswaData'
import Input from './Input'
import Button from './Button'
import { useAddKeterlambatanMutation } from '../services/keterlambatan'
import DefaultModal, { Gap } from './DefaultModal'

interface Props {
    visible: boolean,
    closeModal: () => void
    nis: string,
    namaLengkap: string,
    fullClass: string
}

const AddKeterlambatanModal: React.FC<Props> = ({ nis, namaLengkap, fullClass, visible, closeModal }) => {
    const [alasan, setAlasan] = useState('')
    const [addKeterlambatan, { isLoading }] = useAddKeterlambatanMutation()

    const onAlasanChange = (v: string) => {
        setAlasan(v)
    }

    const onCorfimationPressed = () => {
        addKeterlambatan({ nis, alasan })
    }

    return (
        <DefaultModal
            closeModal={closeModal}
            visible={visible}
        >
            <DisplaySiswaData
                nis={nis}
                namaLengkap={namaLengkap}
                fullClass={fullClass}
                isSingle={true}
            />
            <Input
                placeholder='Alasan'
                onChangeText={onAlasanChange}
            />
            <Gap />
            <Button
                text='Konfirmasi'
                onPress={onCorfimationPressed}
            />
        </DefaultModal>
    )
}

export default AddKeterlambatanModal