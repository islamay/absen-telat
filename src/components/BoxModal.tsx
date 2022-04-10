import React from 'react'
import { View, StyleSheet } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import VAR from '../styles/VAR'

export type Props = DefaultModalProps;

const BoxModal: React.FC<Props> = ({ closeModal, visible, children }) => {

    return (
        <DefaultModal closeModal={closeModal} visible={visible}>
            <View style={styles.container}>
                {children}
            </View>
        </DefaultModal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: VAR.outlineDefaultColor
    }
})

export default BoxModal