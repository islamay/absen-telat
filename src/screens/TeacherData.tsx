import { FontAwesome5 } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator, Searchbar, FAB } from 'react-native-paper'
import TeacherCard from '../components/TeacherCard'
import Typography from '../components/Typography'
import { AccountType, TeacherRole } from '../constants/account'
import styleGuide from '../constants/styleGuide'
import { useAppSelector } from '../hooks/redux'
import useSearchTeachersByName from '../hooks/useSearchTeachersByName'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { TeacherStackParamList } from '../navigation/Teacher'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { Teacher, useLazyGetTeachersByNameQuery } from '../services/teacher'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    DrawerScreenProps<TeacherHomeStackParamList, 'TeacherData'>
>;

const renderTeachers = ({ item }: { item: Teacher }) => {

    return (
        <TeacherCard
            style={styles.card}
            id={item._id}
            key={item._id}
            name={item.nama}
            status={item.status}
            email={item.email}
            role={item.role}
        />
    )
}

const TeacherData: React.FC<ScreenProps> = ({ navigation }) => {
    const { role } = useAppSelector(state => state.auth)
    const [query, setQuery] = useState('')
    const { isLoading, teachers, refetch } = useSearchTeachersByName(query)
    const goToAddTeacherScreen = () => {
        navigation.push('AddTeacherOrStudent', { type: AccountType.GURU })
    }

    return (
        <Classic
            header={{
                title: 'Data guru',
                icon: <FontAwesome5 name='user-tie' size={96} color={styleGuide.colorSecondary} />,
                navigation: navigation
            }}
        >
            <ClassicBodyHeader>
                <Typography type='title'>Cari guru</Typography>
                <Searchbar
                    value={query}
                    onChangeText={v => setQuery(v)}
                />
            </ClassicBodyHeader>
            <ClassicBodyContents withScrollView={false} >
                {
                    isLoading
                        ? <ActivityIndicator size={styleGuide.fontMedium} />
                        :
                        <FlatList
                            data={teachers}
                            keyExtractor={item => item._id}
                            renderItem={renderTeachers}
                            contentContainerStyle={styles.teacherList}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={refetch}
                                />
                            }
                        />

                }
                {
                    role === TeacherRole.ADMIN &&
                    <FAB
                        icon='plus'
                        style={styles.fab}
                        color={styleGuide.colorWhite}
                        onPress={goToAddTeacherScreen}
                    />
                }
            </ClassicBodyContents>

        </Classic>
    )
}

const styles = StyleSheet.create({
    teacherList: {
        flexGrow: 1,
        padding: 20
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: styleGuide.colorSecondary
    },
    card: {
        marginVertical: 2
    }
})

export default TeacherData
