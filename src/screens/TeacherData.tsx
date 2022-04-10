import React, { useEffect, useState, useMemo } from 'react'
import { ListRenderItem, Text, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import LightBlueScreen from '../components/LightBlueScreen'
import SearchInput from '../components/SearchInput'
import TeacherDisplay from '../components/TeacherDisplay'
import { useGetTeacherByNameQuery, GetTeacherResponse, Teacher } from '../services/teacherData'
import TeacherModal from '../components/TeacherModal'
import FloatingButton from '../components/FloatingButton'
import { Ionicons } from '@expo/vector-icons'
import VAR from '../styles/VAR'
import AddTeacherModal from '../components/AddTeacherModal'

const TeacherData: React.FC = () => {
    const [name, setName] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [addTeacherModal, setAddTeacherModal] = useState(false)
    const [teacherDetailModal, setTeacherDetailModal] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher>({ namaLengkap: '', email: '', role: '', status: '' })
    const { data } = useGetTeacherByNameQuery(name)


    const onQueryChange = (v: string) => {
        setName(v)
    }

    const renderTeacherData: ListRenderItem<GetTeacherResponse> = ({ item, index }) => {

        return (
            <TeacherDisplay
                isLast={data?.length === index + 1}
                name={item.namaLengkap}
                email={item.email}
                role={item.role}
                status={item.status}
                onPress={() => {
                    setSelectedTeacher({ namaLengkap: item.namaLengkap, email: item.email, role: item.role, status: item.status })
                    setTeacherDetailModal(true)
                }}
            />
        )
    }

    const onAddTeacherButtonPressed = () => {
        setAddTeacherModal(true)
    }

    const closeAddTeacherModal = () => {
        setAddTeacherModal(false)
    }

    const closeTeacherDetailModal = () => {
        setTeacherDetailModal(false)
    }

    return (
        <LightBlueScreen>
            <AddTeacherModal
                visible={addTeacherModal}
                closeModal={closeAddTeacherModal}
            />
            <TeacherModal
                visible={teacherDetailModal}
                closeModal={closeTeacherDetailModal}
                namaLengkap={selectedTeacher.namaLengkap}
                email={selectedTeacher.email}
                role={selectedTeacher.role}
                status={selectedTeacher.status}
            />
            <SearchInput
                placeholder='Cari Guru'
                onChange={onQueryChange}
            />

            <FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderTeacherData}
            />

            <FloatingButton
                onPress={onAddTeacherButtonPressed}
                icon={<Ionicons name="add" size={VAR.mediumFontSize} color={VAR.white} />}
            />


        </LightBlueScreen>
    )
}

export default TeacherData