import React from 'react'
import { View, Text } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import DisplaySiswaData from './DisplaySiswaData'

interface Props extends DefaultModalProps {
    nis: string,
    namaLengkap: string,
    fullClass: string
}

const DataSiswaModal: React.FC<Props> = ({ visible, closeModal, nis, namaLengkap, fullClass }) => {

    return (
        <DefaultModal
            visible={visible}
            closeModal={closeModal}
        >
            <DisplaySiswaData
                nis={nis}
                namaLengkap={namaLengkap}
                fullClass={fullClass}
                isSingle={true}
            />
        </DefaultModal>
    )
}

export default DataSiswaModal