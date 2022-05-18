import React from 'react'
import { StyleSheet } from 'react-native'
import { Modal } from 'react-native-paper'
import styleGuide from '../constants/styleGuide'

interface Props {
    visible: boolean,
    onDismiss: () => void,
    dismissable?: boolean
}

const NewModal: React.FC<Props> = ({ onDismiss, visible, children, dismissable = true }) => {

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            dismissable={dismissable}
            contentContainerStyle={styles.contentContainerStyle}
        >
            {children}
        </Modal>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        backgroundColor: styleGuide.colorWhite,
        padding: 20,
        alignSelf: 'center',
        borderRadius: 20
    }
})

export default NewModal