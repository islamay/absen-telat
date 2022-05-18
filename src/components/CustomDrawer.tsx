import Typography from './Typography'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'
import styleGuide from '../constants/styleGuide'
import React, { useCallback, useMemo, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { useTeacherSignOutMutation } from '../services/teacher'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import type { TeacherHomeStackParamList } from '../navigation/TeacherHome'

interface Props extends DrawerContentComponentProps { }

interface CustomDrawerItemProps {
    label: string | ((props: { focused: boolean, color: string }) => React.ReactNode),
    onPress?: () => void,
    focused?: boolean,
    icon?: ({ }: { focused: boolean }) => React.ReactNode,
    style?: StyleProp<ViewStyle>
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({ label, onPress = () => { }, focused, icon, style }) => {

    return (
        <DrawerItem
            activeTintColor={styleGuide.colorTertiary}
            label={label}
            onPress={onPress}
            focused={focused}
            icon={icon}
            labelStyle={styles.label}
            style={style}
        />
    )
}

const CustomDrawer: React.FC<Props> = (props) => {
    const { teacher } = useAppSelector(state => state)
    const [signout] = useTeacherSignOutMutation()
    const [nestedDrawerVisible, setNestedDrawerVisible] = useState(false)

    const closeNestedDrawer = () => {
        setNestedDrawerVisible(false)
    }
    const openNestedDrawer = () => {
        setNestedDrawerVisible(true)
    }
    const focusedScreen = useMemo(() => props.state.routeNames[props.state.index], [props.state.index])

    const isFocused = useCallback((routeName: keyof TeacherHomeStackParamList | 'nestedDrawerParent') => {
        if (focusedScreen === routeName) return true
        else if (routeName === 'nestedDrawerParent' && nestedDrawerVisible) return true
        else return false
    }, [props.state.index, nestedDrawerVisible])

    const goTo = useMemo(() => {
        return {
            home: () => props.navigation.navigate('Home'),
            studentData: () => props.navigation.navigate('StudentData'),
            teacherData: () => props.navigation.navigate('TeacherData'),
            Statistic: () => props.navigation.navigate('Statistic'),
            profile: () => props.navigation.navigate('Profile'),
            latenessStatistic: () => props.navigation.navigate('LatenessStatistic'),
            violationStatistic: () => props.navigation.navigate('ViolationStatistic')
        }
    }, [])

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
                    onPress={goTo.home}
                />
                <CustomDrawerItem
                    label='Data Siswa'
                    icon={({ focused }) => {
                        return <FontAwesome5 name='user-friends' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    onPress={goTo.studentData}
                    focused={isFocused('StudentData')}
                />
                <CustomDrawerItem
                    label='Data Guru'
                    icon={({ focused }) => {
                        return <FontAwesome5 name='user-tie' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    onPress={goTo.teacherData}
                    focused={isFocused('TeacherData')}
                />
                {/* <CustomDrawerItem
                    icon={({ focused }) => {
                        return <FontAwesome name='bar-chart' size={styleGuide.fontBig} style={{ width: 32 }} color={styleGuide.colorGray} />
                    }}
                    onPress={!nestedDrawerVisible ? openNestedDrawer : closeNestedDrawer}
                    label={({ color }) => (
                        <View style={styles.nestedDrawerLabelContainer}>
                            <Text style={[{ color }, styles.container]}>Statistik</Text>
                            <FontAwesome name={nestedDrawerVisible ? 'angle-up' : 'angle-down'} color={color} size={styleGuide.fontBig} />
                        </View>
                    )}
                />
                {
                    nestedDrawerVisible && (
                        <>
                            <CustomDrawerItem
                                label='Keterlambatan'
                                style={styles.nestedDrawer}
                                icon={({ focused }) => {
                                    return <FontAwesome name='bar-chart' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                                }}
                                focused={isFocused('LatenessStatistic')}
                                onPress={goTo.latenessStatistic}
                            />
                            <CustomDrawerItem
                                label='Pelanggaran'
                                style={styles.nestedDrawer}
                                icon={({ focused }) => {
                                    return <FontAwesome name='bar-chart' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                                }}
                                focused={isFocused('ViolationStatistic')}
                                onPress={goTo.violationStatistic}
                            />
                        </>
                    )
                } */}
                <CustomDrawerItem
                    label='Keterlambatan'
                    icon={({ focused }) => {
                        return <FontAwesome name='bar-chart' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    focused={isFocused('LatenessStatistic')}
                    onPress={goTo.latenessStatistic}
                />
                <CustomDrawerItem
                    label='Akun'
                    onPress={goTo.profile}
                    icon={({ focused }) => {
                        return <FontAwesome name='user' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                    }}
                    focused={isFocused('Profile')}
                />
            </DrawerContentScrollView>
            <DrawerItem
                label='Logout'
                icon={({ focused }) => {
                    return <MaterialIcons name='logout' size={styleGuide.fontBig} style={{ width: 32 }} color={focused ? styleGuide.colorTertiary : styleGuide.colorGray} />
                }}
                onPress={signout}
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
    },
    nestedDrawerLabelContainer: {
        marginLeft: -20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    nestedDrawer: {
        marginLeft: '10%'
    }
})

export default CustomDrawer