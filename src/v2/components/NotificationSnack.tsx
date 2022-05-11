import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Snackbar } from 'react-native-paper'
import styleGuide from '../constants/styleGuide'

interface Props {
    visible: boolean,
    onDismiss: () => void,
    isSuccess: boolean,
    successMessage: string,
    errorMessage: string
}

const NotificationSnack: React.FC<Props> = ({ isSuccess, successMessage, errorMessage, visible, onDismiss }) => {

    return (
        <Snackbar
            onDismiss={onDismiss}
            visible={visible}
            style={isSuccess ? styles.success : styles.error}
        >
            {isSuccess ? successMessage : errorMessage}
        </Snackbar>
    )
}

const styles = StyleSheet.create({
    success: {
        backgroundColor: styleGuide.colorPrimary
    },
    error: {
        backgroundColor: styleGuide.colorDanger
    }
})

export default NotificationSnack

