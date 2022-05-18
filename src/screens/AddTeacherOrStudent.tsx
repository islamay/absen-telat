import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Clean, { CleanHeader } from '../layout/Clean'
import styleGuide from '../constants/styleGuide'
import TextInput from '../components/TextInput'
import useAddStudent from '../hooks/useAddStudent'
import { Picker } from '@react-native-picker/picker'
import { Majors, usePostStudentMutation } from '../services/student'
import textInputHandler from '../utils/textInputHandler'
import Typography from '../components/Typography'
import Button from '../components/Button'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { TeacherStackParamList } from '../navigation/Teacher'
import { AccountType } from '../constants/account'
import { useAppDispatch } from '../hooks/redux'
import sleep from '../utils/sleep'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { usePostTeacherMutation } from '../services/teacher'

type ScreenProps = NativeStackScreenProps<TeacherStackParamList, 'AddTeacherOrStudent'>
type NavigationProps = NativeStackNavigationProp<TeacherStackParamList, 'AddTeacherOrStudent'>

const AddStudentForm: React.FC = () => {
    const newStudent = useAddStudent()
    const [addStudent, { isSuccess, isUninitialized, isError, data, error }] = usePostStudentMutation()
    const [isLoading, setIsLoading] = useState(false)
    const errorMessage = useRef('')
    const isAbleToAdd = !!newStudent.name && !!newStudent.nis && !!newStudent.major
    const navigation = useNavigation<NavigationProps>()

    const onGradeChange = (v: number) => {
        newStudent.setGrade(v)
    }

    const onGradeNoChange = (v: number) => {
        newStudent.setGradeNo(v)
    }

    const onMajorChange = (v: Majors | '') => {
        newStudent.setMajor(v)
    }

    const resetState = () => {
        newStudent.setNis('')
        newStudent.setName('')
        newStudent.setGrade(10)
        newStudent.setGradeNo(1)
        newStudent.setMajor('')
    }


    const goToStudentDetail = () => {
        navigation.push('StudentDetail', {
            nis: newStudent.nis
        })
    }

    const createSuccessAlert = () => {
        Alert.alert(
            'Berhasil menambahkan siswa',
            '',
            [
                { text: 'Ok', onPress: resetState },
                {
                    text: 'Detail',
                    onPress: goToStudentDetail
                }
            ]
        )
    }

    const createFailedAlert = () => {
        Alert.alert(
            'Gagal menambahkan siswa',
            errorMessage.current,
            [
                { text: 'Coba lagi' }
            ]
        )
    }

    const handleAddStudent = async () => {
        if (newStudent.major === '') return;

        try {

            setIsLoading(true)
            const addingStudent = addStudent({
                nis: newStudent.nis,
                name: newStudent.name,
                grade: newStudent.grade,
                gradeNo: newStudent.gradeNo,
                major: newStudent.major
            }).unwrap()



            await sleep(1000)
            await addingStudent
            resetState()
            createSuccessAlert()
        } catch (error: any) {
            if (!!error.status && !!error.data) {
                errorMessage.current = error.data.message
            } else {
                errorMessage.current = 'Harap coba lagi'
            }

            createFailedAlert()
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <>
            <TextInput
                label='Nis'
                mode='outlined'
                value={newStudent.nis}
                onChangeText={textInputHandler(newStudent.setNis)}
            />
            <TextInput
                label='Nama'
                mode='outlined'
                value={newStudent.name}
                onChangeText={textInputHandler(newStudent.setName)}
            />
            <Typography>Kelas</Typography>
            <Picker
                selectedValue={newStudent.grade}
                onValueChange={onGradeChange}
            >
                {
                    [10, 11, 12, 13].map(v => (
                        <Picker.Item key={v} value={v} label={v.toString()} />
                    ))
                }
            </Picker>
            <Typography>Nomor Kelas</Typography>
            <Picker
                selectedValue={newStudent.gradeNo}
                onValueChange={onGradeNoChange}
            >
                {
                    [1, 2, 3, 4].map(v => (
                        <Picker.Item key={v} value={v} label={v.toString()} />
                    ))
                }
            </Picker>
            <Typography>Jurusan</Typography>
            <Picker
                selectedValue={newStudent.major}
                onValueChange={onMajorChange}
            >
                <Picker.Item value='' label='Tidak ada' />
                {
                    Object.values(Majors).map(v => (
                        <Picker.Item key={v} value={v} label={v} />
                    ))
                }
            </Picker>

            <Button disabled={!isAbleToAdd || isLoading} onPress={handleAddStudent}>
                {
                    isLoading
                        ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                        : 'Tambahkan'
                }
            </Button>


        </>
    )
}

const AddTeacherForm: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [addTeacher, { isSuccess, data }] = usePostTeacherMutation()
    const errorMessage = useRef('')
    const teacherIdRef = useRef('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation<NavigationProps>()
    const isAbleToAdd = !!name && !!email


    const resetState = () => {
        setName('')
        setEmail('')
    }

    const goToTeacherDetail = () => {
        navigation.navigate('TeacherDetail', { id: teacherIdRef.current })
    }

    const createSuccessAlert = () => {
        Alert.alert(
            'Berhasil menambahkan pengajar',
            '',
            [
                { text: 'Ok', onPress: resetState },
                { text: 'Detail', onPress: goToTeacherDetail }
            ]
        )
    }

    const createFailAlert = () => {
        Alert.alert(
            'Gagal menambahkan pengajar',
            errorMessage.current,
            [
                { text: 'Ok' }
            ]
        )
    }

    const onTeacherFormSubmit = async () => {
        try {
            setIsLoading(true)
            const postingTeacher = addTeacher({ name, email }).unwrap()
            await sleep(500)
            const teacher = await postingTeacher
            teacherIdRef.current = teacher._id
            resetState()
            createSuccessAlert()
        } catch (error: any) {
            if (!!error.status && !!error.data) {
                errorMessage.current = error.data.message
            } else {
                errorMessage.current = 'Coba lagi beberapa saat'
            }
            createFailAlert()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <TextInput
                label='Nama'
                mode='outlined'
                value={name}
                onChangeText={textInputHandler(setName)}
            />
            <TextInput
                label='Email'
                mode='outlined'
                value={email}
                onChangeText={textInputHandler(setEmail)}
            />

            <Button disabled={!isAbleToAdd} onPress={onTeacherFormSubmit} style={styles.confirmButton}>

                {
                    isLoading
                        ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                        : 'Tambahkan'

                }
            </Button>

        </>
    )
}

const AddTeacherOrStudent: React.FC<ScreenProps> = ({ route }) => {

    return (
        <Clean scrollable={true}>
            <CleanHeader
                title={route.params.type === AccountType.GURU ? 'Tambahkan pengajar' : 'Tambahkan siswa'}
                withBackButton={true}
            />
            <FontAwesome5 name='user-plus' color={styleGuide.colorSecondary} size={96} style={styles.icon} />
            <View style={styles.container}>

                {
                    route.params.type === AccountType.GURU
                        ? <AddTeacherForm />
                        : <AddStudentForm />
                }


            </View>
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 60,
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'center'
    },
    confirmButton: {
        marginTop: 10
    }
})

export default AddTeacherOrStudent