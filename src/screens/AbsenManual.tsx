import React, { useState } from 'react'
import { View, Text, FlatList, ListRenderItem, ActivityIndicator } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import SearchInput from '../components/SearchInput'
import { ISiswa, useGetSiswaByNameQuery } from '../services/dataSiswa'
import DisplaySiswaData from '../components/DisplaySiswaData'
import VAR from '../styles/VAR'
import AddKeterlambatanModal from '../components/AddKeterlambatanModal'
import styles from '../styles/AbsenManual'

interface SelectedSiswa {
    nis: string,
    namaLengkap: string,
    fullClass: string
}

const AbsenManual = () => {
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedSiswa, setSelectedSiswa] = useState<SelectedSiswa>({ nis: '', namaLengkap: '', fullClass: '' })
    const { data: siswaData, isLoading, isError } = useGetSiswaByNameQuery(name)

    const onQueryChange = (v: string) => setName(v)
    const renderSiswaData: ListRenderItem<ISiswa> = ({ item, index }) => {
        return (
            <DisplaySiswaData
                nis={item.nis}
                namaLengkap={item.namaLengkap}
                fullClass={item.fullClass}
                isLast={siswaData && siswaData.length - 1 === index}
                onPress={({ nis, namaLengkap, fullClass }) => {
                    setSelectedSiswa({ nis, namaLengkap, fullClass })
                    setModalVisible(true)
                }}
            />
        )
    }

    return (
        <LightBlueScreen>
            <AddKeterlambatanModal
                visible={modalVisible}
                nis={selectedSiswa.nis}
                namaLengkap={selectedSiswa.nis}
                fullClass={selectedSiswa.fullClass}
                closeModal={() => setModalVisible(false)}
            />

            <SearchInput placeholder='Cari Siswa' onChange={onQueryChange} />

            <FlatList
                data={siswaData}
                renderItem={renderSiswaData}
                keyExtractor={data => data._id}
                style={styles.listContainer}
            />
        </LightBlueScreen>
    )
}

export default AbsenManual