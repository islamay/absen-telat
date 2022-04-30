import { FontAwesome } from '@expo/vector-icons'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import styleGuide from '../constants/styleGuide'
import Classic from '../layout/Classic'
import { TeacherStackParamList } from '../navigation/Teacher'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    DrawerScreenProps<TeacherHomeStackParamList, 'Statistic'>
>;

const Statistic: React.FC<ScreenProps> = ({ navigation }) => {

    return (
        <Classic
            header={{
                title: 'Statistik',
                icon: <FontAwesome size={96} color={styleGuide.colorSecondary} name='bar-chart' />,
                navigation: navigation
            }}
        >

        </Classic>
    )
}

export default Statistic