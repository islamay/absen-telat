import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HeaderContent from './HeaderContent'
import Input from './Input'
import DefaultModal, { Props as DefaultModalProps, Gap } from './DefaultModal'
import { useAddTeacherMutation, AddTeacherBody } from '../services/teacherData'
import Button from './Button'
import VAR from '../styles/VAR'

interface Props extends DefaultModalProps {

}

const AddTeacherModal: React.FC<Props> = ({ closeModal, visible }) => {
    const [newTeacher, setNewTeacher] = useState<AddTeacherBody>({ email: '', namaLengkap: '', password: '' })
    const [addTeacher, { isLoading }] = useAddTeacherMutation()
    const isNewTeacherValid = !!newTeacher.email && !!newTeacher.namaLengkap && !!newTeacher.password

    const onNameChanged = (v: string) => {
        setNewTeacher(prev => ({ ...prev, namaLengkap: v, password: v }))
    }

    const onPasswordChanged = (v: string) => {
        setNewTeacher(prev => ({ ...prev, email: v }))
    }

    const onSubmitButtonPressed = () => {
        addTeacher(newTeacher)
    }

    const closeModalWithCleanup = () => {
        setNewTeacher({ email: '', namaLengkap: '', password: '' })
        closeModal()
    }

    return (
        <DefaultModal
            visible={visible}
            closeModal={closeModalWithCleanup}
        >
            <Text style={styles.header}>Tambahkan Guru</Text>
            <Gap />
            <Input placeholder='Nama' onChangeText={onNameChanged} value={newTeacher.namaLengkap} />
            <Input placeholder='Email' onChangeText={onPasswordChanged} value={newTeacher.email} />
            <Gap />
            <Button
                text='Tambahkan'
                disabled={!isNewTeacherValid}
                onPress={onSubmitButtonPressed}
            />
        </DefaultModal>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: VAR.smallFontSize,
        color: VAR.darkBlue
    }
})

export default AddTeacherModal