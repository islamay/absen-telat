import React, { useState } from 'react'
import { ListRenderItem, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import LightBlueScreen from '../components/LightBlueScreen'
import SearchInput from '../components/SearchInput'
import { useGetSiswaAccountQuery, GetSiswaResponse } from '../services/siswaAccount'
import DisplaySiswaAccount from '../components/DisplaySiswaAccount'
import SiswaAccountModal from '../components/SiswaAccountModal'

interface SelectedSiswa {
    nis: string,
    name: string,
    fullClass: string,
    status: string
}

const SiswaAccount: React.FC = () => {
    const [name, setName] = useState('')
    const [selectedSiswa, setSelectedSiswa] = useState<SelectedSiswa>({ nis: '', name: '', fullClass: '', status: '' })
    const [modalVisible, setModalVisible] = useState(false)
    const { data, isError, error } = useGetSiswaAccountQuery(name)

    console.log(isError);


    const onSearchChange = (v: string) => {
        setName(v)
    }

    const renderSiswaAccount: ListRenderItem<GetSiswaResponse> = ({ item, index }) => {

        const onPress = () => {
            setModalVisible(true)
            setSelectedSiswa({
                nis: item.nis,
                name: item.siswa.namaLengkap,
                fullClass: item.siswa.fullClass,
                status: item.status
            })
        }

        return (
            <DisplaySiswaAccount
                nis={item.nis}
                fullName={item.siswa.namaLengkap}
                fullClass={item.siswa.fullClass}
                status={item.status}
                isLast={data?.length === index + 1}
                onPress={onPress}
            />
        )
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <LightBlueScreen>
            {
                isError && <Text>{error}</Text>
            }
            <SiswaAccountModal
                visible={modalVisible}
                closeModal={closeModal}
                nis={selectedSiswa.nis}
                fullName={selectedSiswa.name}
                fullClass={selectedSiswa.fullClass}
                status={selectedSiswa.status}
            />
            <SearchInput
                placeholder='Cari Siswa'
                onChange={onSearchChange}
            />

            <FlatList
                data={data}
                keyExtractor={siswaAccount => siswaAccount._id}
                renderItem={renderSiswaAccount}
            />
        </LightBlueScreen>
    )
}

export default SiswaAccount