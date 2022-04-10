import React from 'react'
import { View, Text } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import { Teacher } from '../services/teacherData'
import styles from '../styles/TeacherModal'

interface Props extends DefaultModalProps, Teacher {

}

const TeacherModal: React.FC<Props> = ({ visible, closeModal, namaLengkap, email, role, status }) => {

    return (
        <DefaultModal
            closeModal={closeModal}
            visible={visible}
        >
            <View style={styles.box}>
                <Text style={styles.header}>Nama : <Text style={styles.content}>{namaLengkap}</Text></Text>
                <Text style={styles.header}>Email : <Text style={styles.content}>{email}</Text></Text>
                <Text style={styles.header}>Role : <Text style={styles.content}>{role}</Text></Text>
                <Text style={styles.header}>Status : <Text style={styles.content}>{status}</Text></Text>
            </View>

        </DefaultModal>
    )
}

export default TeacherModal