import React, { useState } from 'react'
import { View, Text, FlatList, ListRenderItem } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import Input from '../components/Input'
import styles from '../styles/DataKeterlambatan'
import { useGetKeterlambatanQuery, Keterlambatan as IKeterlambatan } from '../services/keterlambatan'
import DisplayKeterlambatan from '../components/DisplayKeterlambatan'
import FloatingButton from '../components/FloatingButton'
import { MaterialIcons } from '@expo/vector-icons'
import DownloadKeterlambatanModal from '../components/DownloadKeterlambatanModal'
import VAR from '../styles/VAR'

const Keterlambatan = () => {
    const [showDownloadModal, setShowDownloadModal] = useState(false)
    const { data, isError, isLoading, refetch } = useGetKeterlambatanQuery(null)

    const renderKeterlambatan: ListRenderItem<IKeterlambatan> = ({ item, index }) => {
        return (
            <DisplayKeterlambatan
                nis={item.nis}
                namaLengkap={item.siswa.namaLengkap}
                kelas='X RPL'
                alasan={item.alasan}
                isLast={data && data.length - 1 === index}
                onPress={() => console.log('Pressed')}
            />
        )
    }

    const onDownloadButtonPress = () => {
        setShowDownloadModal(true)
    }

    return (
        <LightBlueScreen>
            <DownloadKeterlambatanModal visible={showDownloadModal} closeModal={() => setShowDownloadModal(false)} />
            <View style={styles.searchContainer}>
                <Input placeholder='Cari Siswa' />
            </View>
            <FlatList
                data={data}
                renderItem={renderKeterlambatan}
                keyExtractor={(k: IKeterlambatan) => k._id}
                style={styles.keterlambatanContainer}
            />
            <FloatingButton
                icon={<MaterialIcons name="file-download" size={VAR.mediumFontSize} color={VAR.white} />}
                onPress={onDownloadButtonPress}
            />
        </LightBlueScreen>
    )
}

export default Keterlambatan
