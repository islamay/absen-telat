import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { AccountStatus, TeacherRole } from '../constants/account'
import styleGuide from '../constants/styleGuide'
import { TeacherStackParamList } from '../navigation/Teacher'
import Card from './Card'
import Typography from './Typography'

interface Props {
    id: string,
    name: string,
    status: AccountStatus,
    email: string,
    role: TeacherRole,
    style?: StyleProp<ViewStyle>
}

const TeacherCard: React.FC<Props> = ({ name, status, email, id, style }) => {
    const navigation = useNavigation<NativeStackNavigationProp<TeacherStackParamList>>()

    const onAnglePress = () => {
        navigation.navigate('TeacherDetail', { id })
    }

    return (
        <Card style={[styles.container, style]}>
            <FontAwesome5 style={styles.teacherIcon} name='user-tie' size={styleGuide.fontBig + 6} color={styleGuide.colorSecondary} />
            <View style={styles.infoContainer}>
                <Typography type='body' style={styles.infoText}>{name}</Typography>
                <Typography type='tiny' style={styles.infoText}>{email}</Typography>
                {
                    status === AccountStatus.NONAKTIF
                    && <Typography type='tiny' style={styles.warningText}>
                        <FontAwesome name='exclamation-triangle' color={styleGuide.colorWarning} size={styleGuide.fontMedium} />
                        &nbsp;Pengajar sudah tidak aktif
                    </Typography>
                }
            </View>
            <TouchableOpacity onPress={onAnglePress} style={styles.nextIcon}>
                <FontAwesome name='angle-right' size={styleGuide.fontBig + 6} color={styleGuide.colorTertiary} />
            </TouchableOpacity>

        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    teacherIcon: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10
    },
    infoContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    infoText: {
        color: styleGuide.colorTertiary
    },
    warningText: {
        marginTop: 6
    },
    nextIcon: {
        alignSelf: 'center',
        paddingHorizontal: 10
    }
})

export default TeacherCard