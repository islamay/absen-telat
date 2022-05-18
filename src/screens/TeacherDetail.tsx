import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import TextInput from '../components/TextInput'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'
import Clean, { CleanHeader } from '../layout/Clean'
import { TeacherStackParamList } from '../navigation/Teacher'
import { useGetTeacherByIdQuery, usePatchTeacherMutation } from '../services/teacher'
import { AccountStatus, EditableAccountStatus, TeacherRole } from '../constants/account'
import textInputHandler from '../utils/textInputHandler'
import Button from '../components/Button'
import NotificationSnack from '../components/NotificationSnack'

type ScreenProps = NativeStackScreenProps<TeacherStackParamList, 'TeacherDetail'>

const TeacherDetail: React.FC<ScreenProps> = ({ route }) => {
    const { data, isError, isSuccess, isLoading, error } = useGetTeacherByIdQuery(route.params.id)
    const [editedEmail, setEditedEmail] = useState('')
    const [editedRole, setEditedRole] = useState<TeacherRole>()
    const [editedStatus, setEditedStatus] = useState<AccountStatus>()
    const [patch, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError }] = usePatchTeacherMutation()
    const [snackVisible, setSnackVisible] = useState(false)

    const rolePickers = useMemo(() => {
        return Object.values(TeacherRole).map(r => (
            <Picker.Item key={r} value={r} label={r} />
        ))
    }, [])

    const statusPickers = useMemo(() => {
        return Object.values(EditableAccountStatus).map(s => (
            <Picker.Item key={s} value={s} label={s} />
        ))
    }, [])

    const handlePatchTeacher = useCallback(() => {
        const payload = { id: route.params.id }
        if (editedEmail) Object.assign(payload, { email: editedEmail })
        if (editedRole) Object.assign(payload, { role: editedRole })
        if (editedStatus) Object.assign(payload, { status: editedStatus })

        patch(payload)
    }, [editedEmail, editedRole, editedEmail])

    const onSnackDismiss = () => {
        setSnackVisible(false)
    }

    useEffect(() => {
        if (isUpdateSuccess || isUpdateError) {
            setSnackVisible(true)
        }
    }, [isUpdateSuccess, isUpdateError])

    return (
        <Clean>
            <CleanHeader
                title='Detail pengajar'
                withBackButton={true}
            />
            <View>
                <FontAwesome5 name='user-tie' size={96} color={styleGuide.colorSecondary} style={styles.icon} />
                <View style={styles.infoContainer}>
                    {
                        isLoading
                            ? <ActivityIndicator size={styleGuide.fontBig} color={styleGuide.colorGray} />
                            : isSuccess
                                ? <>

                                    <TextInput
                                        disabled
                                        mode='outlined'
                                        label='Nama'
                                        value={data.nama}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Email'
                                        value={editedEmail ? editedEmail : data.email}
                                        onChangeText={textInputHandler(setEditedEmail)}
                                    />
                                    <Typography>Role</Typography>
                                    <Picker
                                        selectedValue={!!editedRole ? editedRole : data.role}
                                        onValueChange={r => setEditedRole(r)}
                                    >
                                        {rolePickers}
                                    </Picker>
                                    <Typography>Status</Typography>
                                    <Picker
                                        selectedValue={!!editedStatus ? editedStatus : data.status}
                                        onValueChange={s => setEditedStatus(s)}
                                    >
                                        {statusPickers}
                                    </Picker>
                                </>
                                : <Typography>Pengajar tidak ditemukan</Typography>
                    }

                    {
                        data &&
                        (
                            (!!editedEmail && editedEmail !== data.email) ||
                            (!!editedRole && editedRole !== data.role) ||
                            (!!editedStatus && editedStatus !== data.status)
                        ) &&
                        <Button onPress={handlePatchTeacher}>
                            {
                                isUpdateLoading
                                    ? <ActivityIndicator size={styleGuide.fontMedium} color={styleGuide.colorWhite} />
                                    : 'Konfirmasi'
                            }
                        </Button>
                    }
                </View>
            </View>
            <NotificationSnack
                onDismiss={onSnackDismiss}
                visible={snackVisible}
                isSuccess={isUpdateSuccess}
                successMessage='Berhasil mengupdate'
                errorMessage='Gagal mengupdate'
            />
        </Clean>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    icon: {
        alignSelf: 'center'
    },
    infoContainer: {
        paddingVertical: 20,
        paddingHorizontal: 50
    },
})

export default TeacherDetail