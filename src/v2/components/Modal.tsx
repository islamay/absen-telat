import React from 'react'
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, StyleProp, ViewStyle, StyleSheet, Dimensions, Pressable, ModalProps } from 'react-native'
import Constants from 'expo-constants'
import styleGuide from '../constants/styleGuide'

export interface Props extends ModalProps {
    visible: boolean,
    closeModal: () => void,
    style?: StyleProp<ViewStyle>,
    dismissable?: boolean
}

const AddKeterlambatanModal: React.FC<Props> = ({ visible, closeModal, children, style, dismissable = true, ...rest }) => {

    const exitOnDismiss = () => {
        if (dismissable) {
            closeModal()
        }
    }

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
        >
            <Pressable disabled={!dismissable} style={styles.centeredView} onPress={exitOnDismiss}>
                <TouchableWithoutFeedback>
                    <View style={[styles.modalView, style]}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: styleGuide.colorWhite,
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 20

    }
})

export default AddKeterlambatanModal