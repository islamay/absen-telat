import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Searchbar, FAB } from 'react-native-paper'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import Classic, { ClassicBodyHeader, ClassicBodyContents } from '../layout/Classic'
import { TeacherStackParamList } from '../navigation/Teacher'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import useSearchStudent from '../hooks/useSearchStudent'
import { Student } from '../services/student'
import StudentCard from '../components/StudentCard'
import { useAppSelector } from '../hooks/redux'
import { AccountType, TeacherRole } from '../constants/account'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    DrawerScreenProps<TeacherHomeStackParamList, 'StudentData'>
>;

const renderStudent = ({ item }: { item: Student }) => {

    return (
        <StudentCard
            key={item._id}
            nis={item.nis}
            name={item.namaLengkap}
            fullClass={item.fullClass}
        />
    )
}

const StudentData: React.FC<ScreenProps> = ({ navigation }) => {
    const { role } = useAppSelector(state => state.auth)
    const [query, setQuery] = useState('')
    const { students, isLoading } = useSearchStudent(query)

    const goToAddStudentScreen = () => {
        navigation.push('AddTeacherOrStudent', { type: AccountType.SISWA })
    }

    const onChangeText = (v: string) => {
        setQuery(v)
    }

    return (
        <Classic
            header={{
                title: 'Data siswa',
                icon: <FontAwesome5 name='user-graduate' size={96} color={styleGuide.colorSecondary} />,
                navigation: navigation
            }}
        >
            <ClassicBodyHeader>
                <Typography type='title'>Cari siswa</Typography>
                <Searchbar
                    style={styles.searhbar}
                    value={query}
                    onChangeText={onChangeText}
                />
            </ClassicBodyHeader>

            <ClassicBodyContents withScrollView={false}>


                <View style={styles.container}>


                    {
                        students && (students.length > 0
                            ? <Typography type='tiny'>Ditemukan <Typography type='tiny' style={styles.foundNum}>{students.length}</Typography> siswa</Typography>
                            : <Typography type='tiny'>Siswa tidak ditemukan</Typography>
                        )
                    }

                    {
                        isLoading
                            ? <ActivityIndicator color={styleGuide.colorGray} />
                            :
                            <FlatList
                                data={students}
                                keyExtractor={item => {
                                    return item._id
                                }}
                                renderItem={renderStudent}
                            />
                    }
                </View>

                {
                    role === TeacherRole.ADMIN &&
                    <FAB
                        icon='plus'
                        style={styles.fab}
                        color={styleGuide.colorWhite}
                        onPress={goToAddStudentScreen}
                    />
                }
            </ClassicBodyContents>

        </Classic>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row'
    },
    headerTitle: {
        flex: 1
    },
    searhbar: {
        marginTop: 10
    },
    container: {
        padding: 20,
        flex: 1
    },
    foundNum: {
        color: styleGuide.colorTertiary
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: styleGuide.colorSecondary
    }
})

export default StudentData
