import React, { useState } from 'react'
import { Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DefaultModal, { Props as DefaultModalProps, Gap } from './DefaultModal'
import Input from './Input'
import Button from './Button'
import CustomPicker from './CustomPicker'
import { validJurusan, Jurusan } from '../helpers/jurusan'
import { useAddSiswaMutation } from '../services/dataSiswa'

interface Props extends DefaultModalProps {

}

interface NewSiswa {
    nis: string,
    namaLengkap: string,
    kelas: number,
    kelasNo: number,
    jurusan: Jurusan | ''
}

const validateNewSiswa = (newSiswa: NewSiswa) => {
    const nisValid = !!newSiswa.nis
    const namaLengkapValid = !!newSiswa.namaLengkap
    const kelasValid = newSiswa.kelas >= 10 && newSiswa.kelas <= 12
    const kelasNoValid = newSiswa.kelasNo >= 1 && newSiswa.kelasNo <= 3
    const jurusanValid = !!newSiswa.jurusan

    return nisValid && namaLengkapValid && kelasValid && kelasNoValid && jurusanValid
}

const AddSiswaModal: React.FC<Props> = ({ visible, closeModal }) => {
    const [newSiswa, setNewSiswa] = useState<NewSiswa>({ nis: '', namaLengkap: '', kelas: 10, kelasNo: 1, jurusan: '' })
    const isValidNewSiswa = validateNewSiswa(newSiswa)
    const [addSiswa, { isLoading }] = useAddSiswaMutation()

    const onNisChange = (v: string) => {
        setNewSiswa((prev) => {
            return { ...prev, nis: v }
        })
    }

    const resetNewSiswaState = () => {
        setNewSiswa({ nis: '', namaLengkap: '', kelas: 0, kelasNo: 0, jurusan: '' })
    }

    const closeModalWithCleanup = () => {
        resetNewSiswaState()
        closeModal()
    }

    const onNamaChange = (v: string) => {
        setNewSiswa((prev) => {
            return { ...prev, namaLengkap: v }
        })
    }

    const onKelasChange = (v: number) => {
        setNewSiswa((prev) => {
            return { ...prev, kelas: v }
        })
    }

    const onKelasNoChange = (v: number) => {
        setNewSiswa((prev) => {
            return { ...prev, kelasNo: v }
        })
    }

    const onJurusanChange = (v: Jurusan) => {
        setNewSiswa((prev) => {
            return { ...prev, jurusan: v }
        })
    }

    const onConfirmationButtonPressed = () => {
        addSiswa(newSiswa)
        closeModalWithCleanup()
    }

    return (
        <DefaultModal
            visible={visible}
            closeModal={closeModalWithCleanup}
        >
            <Input
                placeholder='Nis'
                onChangeText={onNisChange}
            />
            <Input
                placeholder='Nama'
                onChangeText={onNamaChange}
            />
            <CustomPicker
                onValueChange={onKelasChange}
                selectedValue={newSiswa.kelas}

            >
                <Picker.Item label='Kelas' value={0} />
                <Picker.Item label='10' value={10} />
                <Picker.Item label='11' value={11} />
                <Picker.Item label='12' value={12} />
            </CustomPicker>

            <CustomPicker
                onValueChange={onKelasNoChange}
                selectedValue={newSiswa.kelasNo}
            >
                <Picker.Item label='Nomor Kelas' value={0} />
                <Picker.Item label='1' value={1} />
                <Picker.Item label='2' value={2} />
                <Picker.Item label='3' value={3} />
            </CustomPicker>

            <CustomPicker
                onValueChange={onJurusanChange}
                selectedValue={newSiswa.jurusan}
            >
                <Picker.Item label='Pilih Jurusan' value='' />
                {validJurusan.map(v => {
                    return (
                        <Picker.Item key={v} label={v} value={v} />
                    )
                })}

            </CustomPicker>

            <Gap />
            <Gap />

            <Button
                text='Konfirmasi'
                onPress={onConfirmationButtonPressed}
                disabled={!isValidNewSiswa}
            />

        </DefaultModal>
    )
}

export default AddSiswaModal