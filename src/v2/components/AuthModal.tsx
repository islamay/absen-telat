import React, { useState, useEffect, Dispatch, useMemo } from 'react'
import styleGuide from '../constants/styleGuide'
import Modal from './Modal'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Typography from './Typography'

interface Props {
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    errorTitle: string,
    errorMessage: string,
    displaySuccess: boolean,
    successTitle: string
    successMessage: string
}

const AuthModal: React.FC<Props> = ({ errorTitle, isLoading, isError, errorMessage, isSuccess, successMessage, displaySuccess, successTitle }) => {
    const [visible, setVisible] = useState(false)

    const closeModal = () => {
        setVisible(false)
    }

    const closeModalAndCleanup = () => {
        closeModal()
    }

    useEffect(() => {
        if (isSuccess && displaySuccess) {
            setVisible(true)
        } else if (isLoading && !isSuccess) {
            setVisible(true)
        } else if (isError && !isSuccess) {
            setVisible(true)
        } else if (!isLoading && !isError) {
            setVisible(false)
        }
    }, [isLoading, isError, isSuccess])

    return (
        <Modal closeModal={closeModal} visible={visible} dismissable={false}>
            {isLoading && <ActivityIndicator size={24} color={styleGuide.colorGray} />}
            {isError &&
                <View style={styles.container}>
                    <Typography type='body' font='Roboto' style={styles.errorTitle}>{errorTitle}</Typography>
                    <Typography type='tiny' style={styles.errorBody}>{errorMessage}</Typography>
                    <Typography type='body' onPress={closeModalAndCleanup} style={styles.errorExit}>Coba Lagi</Typography>
                </View>
            }
            {
                isSuccess &&
                <View style={styles.container}>
                    <Typography type='body' font='Roboto' style={styles.errorTitle}>{successTitle}</Typography>
                    <Typography type='tiny' style={styles.errorBody}>{successMessage}</Typography>
                    <Typography type='body' onPress={closeModalAndCleanup} style={styles.errorExit}>Ok</Typography>
                </View>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
    },
    errorTitle: {
        color: styleGuide.colorBlack,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    errorBody: {
        marginVertical: 30,
        textAlign: 'center'
    },
    errorExit: {
        color: styleGuide.colorTertiary,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default AuthModal