import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styleGuide from '../constants/styleGuide'
import { TeacherStackParamList } from '../navigation/Teacher'
import Card from './Card'
import Typography from './Typography'

interface Props {
    nis: string,
    name: string,
    fullClass: string,
    onCardPress?: () => void
}

const StudentCard: React.FC<Props> = ({ nis, name, fullClass, onCardPress }) => {
    const navigation = useNavigation<NativeStackNavigationProp<TeacherStackParamList>>()

    const onNextPress = () => {
        navigation.push('StudentDetail', { nis })
    }

    return (
        <Card style={styles.cardStyle}>
            <TouchableOpacity onPress={onCardPress} style={styles.container}>
                <View>
                    <Typography type='body' style={styles.text}>{name}</Typography>
                    <Typography style={styles.text}>{fullClass}</Typography>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNextPress} style={styles.icon}>
                <FontAwesome name='angle-right' size={styleGuide.fontBig + 6} color={styleGuide.colorTertiary} />
            </TouchableOpacity>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    container: {
        padding: 10,
        flex: 1
    },
    text: {
        color: styleGuide.colorTertiary,
    },
    icon: {
        alignSelf: 'center'
    }
})

export default StudentCard