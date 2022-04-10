import React from 'react'
import { Text, FlatList, ListRenderItem } from 'react-native'
import { useSelector } from 'react-redux'
import DisplayKeterlambatan from '../components/DisplayKeterlambatan'
import LightBlueScreen from '../components/LightBlueScreen'
import { Keterlambatan, useGetKeterlambatanByNisQuery } from '../services/keterlambatan'
import { RootState } from '../store/store'

const PersonalKeterlambatan: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const { data } = useGetKeterlambatanByNisQuery(user.nis)


    const renderPersonalKeterlambatan: ListRenderItem<Keterlambatan> = ({ item, index }) => {

        return (
            <DisplayKeterlambatan
                nis={item.nis}
                namaLengkap={item.siswa.namaLengkap}
                alasan={item.alasan}
                kelas={item.siswa.fullClass}
                isLast={data?.length === index + 1}
            />
        )
    }

    return (
        <LightBlueScreen>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderPersonalKeterlambatan}
            />
        </LightBlueScreen>
    )
}

export default PersonalKeterlambatan