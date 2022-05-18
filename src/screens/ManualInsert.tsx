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
import useSearchStudent from '../hooks/useSearchStudent'


type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<InsertLatenessParamList, 'Manual'>,
    MaterialBottomTabScreenProps<TeacherHomeStackParamList, 'Home'>
>;

const InsertLateness: React.FC<ScreenProps> = ({ navigation }) => {
    const [query, setQuery] = useState('')
    const [selectedStudent, setSelectedStudent] = useState({ nis: '', nama: '', kelas: '' })
    const [addLatenessModalVisible, setAddLatenessModalVisible] = useState(false)
    const { students, isLoading } = useSearchStudent(query)

    const closeModal = () => {
        setAddLatenessModalVisible(false)
    }

    return (
        <Clean scrollable={false}>
            <CleanHeader
                title='Manual'
                withBackButton={true}
            >

            </CleanHeader>
            <View style={styles.container}>

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
                {
                    students && (students.length > 0 ? <Typography type='body' style={styles.foundedText}>
                        Ditemukan <Typography type='body' style={styles.foundedNum}>{students.length}</Typography>
                    </Typography> : <Typography type='body' style={styles.foundedText}>Siswa tidak ditemukan</Typography>)
                }
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={students}
                    keyExtractor={v => {
                        return v._id
                    }}
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
            <AddLatenessModal
                visible={addLatenessModalVisible}
                closeModal={closeModal}
                nis={selectedStudent.nis}
                name={selectedStudent.nama}
                fullClass={selectedStudent.kelas}
            />
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        marginTop: -40,
        flex: 1
    },
    spinner: {
        marginVertical: 20
    },
    listContainer: {
        marginTop: 20,
        paddingBottom: 40,
        flexGrow: 1
    },
    foundedText: {
        marginTop: 10
    },
    foundedNum: {
        color: styleGuide.colorTertiary
    }
})

export default InsertLateness