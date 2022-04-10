import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import DefaultModal, { Props as DefaultModalProps } from './DefaultModal'
import RNDatePicker from '@react-native-community/datetimepicker'
import dateFormat from '../helpers/dateFormat'
import Button from './Button'
import VAR from '../styles/VAR'

interface Props extends DefaultModalProps {

}

const DownloadKeterlambatanModal: React.FC<Props> = ({ closeModal, visible }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [changeFor, setChangeFor] = useState<'start' | 'end'>('start')
    const [isPickerShow, setIsPickerShow] = useState(false)

    const dateChangedHandler = useCallback((event, date: Date | undefined) => {
        if (changeFor === 'start' && date) setStartDate(date)
        else if (date) setEndDate(date)
        setIsPickerShow(false)
    }, [changeFor])

    return (
        <DefaultModal
            closeModal={closeModal}
            visible={visible}

        >
            {
                isPickerShow &&
                <RNDatePicker
                    value={new Date()}
                    onChange={dateChangedHandler}
                />
            }
            <View style={{ width: '100%', height: 100, }}>
                <View style={styles.row}>
                    <Text>Sesudah : {dateFormat(startDate)}</Text>
                    <Button
                        onPress={() => setIsPickerShow(true)}
                        text='Pilih'
                        style={styles.btnStyle}
                    />
                </View>
                <Text>Sesudah : {dateFormat(endDate)}</Text>

            </View>

        </DefaultModal>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnStyle: {
        paddingHorizontal: 20,
        backgroundColor: VAR.darkBlue
    }
})

export default DownloadKeterlambatanModal