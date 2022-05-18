import React from 'react'
import { StyleSheet, View } from 'react-native'
import styleGuide from '../constants/styleGuide'
import Modal, { Props as ModalProps } from './Modal'
import Typography from './Typography'

interface TitleButton {
    text: string,
    color?: string,
    onClick?: () => void,
}

interface Props extends ModalProps {
    title: string,
    errorMessage: string,
    buttons: TitleButton[]
}

const ErrorModal: React.FC<Props> = ({ visible, closeModal, style, title, errorMessage, buttons }) => {

    return (
        <Modal visible={visible} closeModal={closeModal} dismissable={false}>
            <View style={styles.container}>
                <Typography type='body' style={[styles.modalText, styles.titleText]}>{title}</Typography>
                <Typography style={styles.modalText}>{errorMessage}</Typography>
                {buttons.map((v) => {
                    return <Typography key={v.text} type='body' style={[{ color: v.color }, styles.modalText]} onPress={v.onClick || closeModal}>{v.text}</Typography>
                })}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200
    },
    titleText: {
        color: styleGuide.colorBlack,

    },
    modalText: {
        textAlign: 'center',
        marginVertical: 20
    }
})

export default ErrorModal