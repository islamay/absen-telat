import React, { useState } from 'react'
import { View, Text, FlatList, ListRenderItem } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import styles from '../styles/AbsenManual'
import Input from '../components/Input'
import { useGetSiswaByNameQuery, ISiswa } from '../services/dataSiswa'
import DisplaySiswaData from '../components/DisplaySiswaData'
import SearchInput from '../components/SearchInput'
import FloatingButton from '../components/FloatingButton'
import { Ionicons } from '@expo/vector-icons';
import VAR from '../styles/VAR'
import AddSiswaModal from '../components/AddSiswaModal'
import DataSiswaModal from '../components/DataSiswaModal'

interface SelectedSiswa {
    nis: string,
    namaLengkap: string,
    fullClass: string
}

const DataSiswa = () => {
    const [nama, setNama] = useState('')
    const [selectedSiswa, setSelectedSiswa] = useState<SelectedSiswa>({ nis: '', namaLengkap: '', fullClass: '' })
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [dataSiswaModalVisible, setDataSiswaModalVisible] = useState(false)
    const { data, isLoading, isError } = useGetSiswaByNameQuery(nama)

    const onAddButtonPressed = () => {
        setAddModalVisible(true)
    }

    const onSearchInputChanged = (v: string) => {
        setNama(v)
    }

    const renderSiswaData: ListRenderItem<ISiswa> = ({ item, index }) => {
        return (
            <DisplaySiswaData
                nis={item.nis}
                namaLengkap={item.namaLengkap}
                fullClass={item.fullClass}
                isLast={data && data.length - 1 === index}
                onPress={({ nis, namaLengkap, fullClass }) => {
                    setSelectedSiswa({ nis, namaLengkap, fullClass })
                    setDataSiswaModalVisible(true)
                }}
            />
        )
    }

    return (
        <LightBlueScreen>
            <AddSiswaModal
                visible={addModalVisible}
                closeModal={() => { setAddModalVisible(false) }}
            />
            <DataSiswaModal
                visible={dataSiswaModalVisible}
                closeModal={() => setDataSiswaModalVisible(false)}
            />

            <SearchInput
                placeholder='Cari Siswa'
                onChange={onSearchInputChanged}
            />

            <FlatList
                data={data}
                renderItem={renderSiswaData}
                keyExtractor={data => data._id}
                style={styles.listContainer}
            />

            <FloatingButton
                icon={<Ionicons name="add" size={24} color={VAR.white} />}
                onPress={onAddButtonPressed}
            />
        </LightBlueScreen>
    )
}


export default DataSiswa