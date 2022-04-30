import React, { useState } from 'react'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet, FlatList } from 'react-native'
import Clean, { CleanHeader } from '../layout/Clean'
import { InsertLatenessParamList } from '../navigation/InsertLateness'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { ActivityIndicator, Searchbar } from 'react-native-paper'
import Typography from '../components/Typography'
import useDebounce from '../hooks/useDebounce'
import TextInput from '../components/TextInput'
import textInputHandler from '../utils/textInputHandler'
import { Student, useGetStudentsByNameQuery, useLazyGetStudentsByNameQuery } from '../services/student'
import styleGuide from '../constants/styleGuide'
import Card from '../components/Card'
import { FontAwesome } from '@expo/vector-icons'
import StudentCard from '../components/StudentCard'
import AddLatenessModal from '../components/AddLatenessModal'
import sleep from '../utils/sleep'


type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<InsertLatenessParamList, 'Manual'>,
    MaterialBottomTabScreenProps<TeacherHomeStackParamList, 'Home'>
>;

const InsertLateness: React.FC<ScreenProps> = ({ navigation }) => {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [students, setStudents] = useState<Student[]>()
    const [fetchStudents] = useLazyGetStudentsByNameQuery()
    const [selectedStudent, setSelectedStudent] = useState({ nis: '', nama: '', kelas: '' })
    const [addLatenessModalVisible, setAddLatenessModalVisible] = useState(false)




    const closeModal = () => {
        setAddLatenessModalVisible(false)
    }

    useDebounce(() => {
        if (query) (async () => {
            setIsLoading(true)
            const fetching = fetchStudents({ name: query })
            await sleep(500)
            const response = await fetching
            setIsLoading(false)
            setStudents(response.data)
        })()
    }, 500, [query])


    return (
        <Clean scrollable={false}>
            <CleanHeader
                title='Manual'
                withBackButton={true}
            >

            </CleanHeader>
            <View style={styles.container}>
                <AddLatenessModal
                    visible={addLatenessModalVisible}
                    closeModal={closeModal}
                    nis={selectedStudent.nis}
                    name={selectedStudent.nama}
                    fullClass={selectedStudent.kelas}
                />
                <TextInput
                    mode='outlined'
                    value={query}
                    onChangeText={textInputHandler(setQuery)}
                    label='Cari siswa...'
                />
                {
                    isLoading &&
                    <ActivityIndicator style={styles.spinner} size={styleGuide.fontBig} color={styleGuide.colorGray} />
                }
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={students}
                    keyExtractor={v => v._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <StudentCard
                                key={item._id}
                                name={item.namaLengkap}
                                fullClass={item.fullClass}
                                nis={item.nis}
                                onCardPress={() => {
                                    setSelectedStudent({ nis: item.nis, nama: item.namaLengkap, kelas: item.fullClass })
                                    setAddLatenessModalVisible(true)
                                }}
                            />
                        )
                    }}
                />
            </View>
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        marginTop: -40
    },
    spinner: {
        marginVertical: 20
    },
    listContainer: {
        marginTop: 20
    }
})

export default InsertLateness