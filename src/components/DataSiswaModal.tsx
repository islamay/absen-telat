import React from 'react'
import { View, Text } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import DisplaySiswaData from './DisplaySiswaData'

interface Props extends DefaultModalProps {

}

const DataSiswaModal: React.FC<Props> = ({ visible, closeModal }) => {

    return (
        <DefaultModal
            visible={visible}
            closeModal={closeModal}
        >
            <DisplaySiswaData
                nis='123456789'
                namaLengkap='Dean Prayoga'
                fullClass='X RPL'
                isSingle={true}
            />
        </DefaultModal>
    )
}

export default DataSiswaModal