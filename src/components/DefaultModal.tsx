import React from 'react'
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styles from '../styles/DefaultModal'

export interface Props {
    visible: boolean,
    closeModal: () => void
}

export const Gap = () => {
    return (
        <View style={styles.gap}></View>
    )
}

const AddKeterlambatanModal: React.FC<Props> = ({ visible, closeModal, children }) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.centeredView} onPress={closeModal}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default AddKeterlambatanModal