import React, { useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from './Typography'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import type { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { teacherSignOut } from '../redux/authThunk'

interface Props extends DrawerContentComponentProps { }

interface CustomDrawerItemProps {
    label: string,
    onPress?: () => void,
    focused?: boolean,
    icon?: ({ }: { focused: boolean }) => React.ReactNode
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({ label, onPress = () => { }, focused, icon }) => {

    return (
        <DrawerItem
            activeTintColor={styleGuide.colorTertiary}
            label={label}
            onPress={onPress}
            focused={focused}
            icon={icon}
            labelStyle={styles.label}
        />
    )
}

const CustomDrawer: React.FC<Props> = (props) => {
    const { teacher, auth } = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const focusedScreen = useMemo(() => props.state.routeNames[props.state.index], [props.state.index])
    const isFocused = useCallback((routeName: string) => {
        if (focusedScreen === routeName) return true
        else return false
    }, [props.state.index])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name='user-circle-o' size={32} color={styleGuide.colorSecondary} style={styles.headerIcon} />
                <Typography type='body' style={styles.headerText}>{teacher.nama} | {teacher.role.toLocaleLowerCase()}</Typography>
                <Typography type='tiny' style={[styles.headerText, styles.emailText]}>{teacher.email}</Typography>
            </View>
            <DrawerContentScrollView {...props}>

                <CustomDrawerItem
                    label='Beranda'
                    icon={({ focused }) => {
                        return <FontAwesome name='home' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    focused={isFocused('Home')}
                    onPress={() => props.navigation.navigate('Home')}
                />
                <CustomDrawerItem
                    label='Data Siswa'
                    icon={({ focused }) => {
                        return <FontAwesome5 name='user-friends' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    onPress={() => props.navigation.navigate('StudentData')}
                    focused={isFocused('StudentData')}
                />
                <CustomDrawerItem
                    label='Data Guru'
                    icon={({ focused }) => {
                        return <FontAwesome5 name='user-tie' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    onPress={() => props.navigation.navigate('TeacherData')}
                    focused={isFocused('TeacherData')}
                />
                <CustomDrawerItem
                    label='Statistik'
                    icon={({ focused }) => {
                        return <FontAwesome name='bar-chart' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    onPress={() => props.navigation.navigate('Statistic')}
                    focused={isFocused('Statistic')}
                />
                <CustomDrawerItem
                    label='Akun'
                    icon={({ focused }) => {
                        return <FontAwesome name='user' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                />
            </DrawerContentScrollView>
            <DrawerItem
                label='Logout'
                icon={({ focused }) => {
                    return <MaterialIcons name='logout' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                }}
                onPress={() => { dispatch(teacherSignOut()) }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: styleGuide.colorPrimary
    },
    headerIcon: {
        marginBottom: 30
    },
    headerText: {
        color: styleGuide.colorWhite
    },
    emailText: {
        color: styleGuide.colorLightGray
    },
    iconWrapper: {
        width: 30,
        height: 24,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    label: {
        marginLeft: -20
    }
})

export default CustomDrawer