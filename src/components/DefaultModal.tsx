import React from 'react'
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native'
import styles from '../styles/DefaultModal'

export interface Props {
    visible: boolean,
    closeModal: () => void,
    style?: StyleProp<ViewStyle>
}

export const Gap = () => {
    return (
        <View style={styles.gap}></View>
    )
}

const AddKeterlambatanModal: React.FC<Props> = ({ visible, closeModal, children, style }) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.centeredView} onPress={closeModal}>
                <TouchableWithoutFeedback>
                    <View style={[styles.modalView, style]}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default AddKeterlambatanModal