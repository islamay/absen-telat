import React, { useState, useEffect, Dispatch } from 'react'
import styleGuide from '../constants/styleGuide'
import Modal, { Props as ModalProps } from './Modal'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Typography from './Typography'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { resetAuthError } from '../redux/auth'

interface Props extends Omit<ModalProps, 'dismissable'> {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}
export const useAuthModal = (): [boolean, () => void] => {
    const { isError, isLoading } = useAppSelector(state => state.auth)
    const [authModalVisible, setAuthModalVisible] = useState(false)

    const handleCloseAuthModal = () => {
        setAuthModalVisible(false)
    }

    useEffect(() => {
        if (isLoading || isError) {
            setAuthModalVisible(true)
        }
    }, [isLoading])

    return [authModalVisible, handleCloseAuthModal]
}

const AuthModal: React.FC<Props> = ({ closeModal, visible, isLoading, isError, errorMessage }) => {
    const dispatch = useAppDispatch()



    const closeModalAndCleanup = () => {
        dispatch(resetAuthError())
        closeModal()
    }

    return (
        <Modal closeModal={closeModal} visible={visible} dismissable={false}>
            {isLoading && <ActivityIndicator size={24} color={styleGuide.colorGray} />}
            {isError &&
                <View style={styles.container}>
                    <Typography type='body' font='Roboto' style={styles.errorTitle}>Gagal SignIn</Typography>
                    <Typography type='tiny' style={styles.errorBody}>{errorMessage}</Typography>
                    <Typography type='body' onPress={closeModalAndCleanup} style={styles.errorExit}>Coba Lagi</Typography>
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