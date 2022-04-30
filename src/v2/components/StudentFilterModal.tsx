import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import ToggleButton from './ToggleButton'
import Modal, { Props as ModalProps } from './Modal'
import Typography from './Typography'

interface Props extends ModalProps {

}

const StudentFilterModal: React.FC<Props> = ({ visible, closeModal }) => {
    const [selectedGrade, setSelectedGrade] = useState({ 10: false, 11: false, 12: false, 13: false })

    return (
        <Modal
            visible={visible}
            closeModal={closeModal}
        >
            <Typography type='title' style={styles.title}>Filter</Typography>

            <Typography type='body'>Kelas</Typography>
            <ToggleButton
                label='10'
                onToggle={() => {
                    setSelectedGrade(prev => ({ ...prev, "10": true }))
                }}
                onToggleExit={() => {
                    setSelectedGrade(prev => ({ ...prev, "10": false }))
                }}
            />
            <ToggleButton
                label='11'
                onToggle={() => {
                    setSelectedGrade(prev => ({ ...prev, "11": true }))
                }}
                onToggleExit={() => {
                    setSelectedGrade(prev => ({ ...prev, "11": false }))
                }}
            />
            <ToggleButton
                label='12'
                onToggle={() => {
                    setSelectedGrade(prev => ({ ...prev, "12": true }))
                }}
                onToggleExit={() => {
                    setSelectedGrade(prev => ({ ...prev, "12": false }))
                }}
            />
            <ToggleButton
                label='13'
                onToggle={() => {
                    setSelectedGrade(prev => ({ ...prev, "13": true }))
                }}
                onToggleExit={() => {
                    setSelectedGrade(prev => ({ ...prev, "13": false }))
                }}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 20
    }
})

export default StudentFilterModal


