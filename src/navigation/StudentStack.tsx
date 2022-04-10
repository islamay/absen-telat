import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountDetails from '../screens/AccountDetails'
import { defaultMBTNavigationStyle, defaultNativeHeaderOptions } from './defaultScreenOptions'
import VAR from '../styles/VAR'
import PersonalKeterlambatan from '../screens/PersonalKeterlambatan'
import StudentHome from '../screens/StudentHome'
import { Ionicons } from '@expo/vector-icons';

const NotCollabseAbleAndFlexOne: React.FC = ({ children }) => {
    return (
        <View style={{ flex: 1 }} collapsable={false}>
            {children}
        </View>
    )
}

const HomeStack = createNativeStackNavigator()
const HomeStackScreens = () => {

    return (
        <NotCollabseAbleAndFlexOne>
            <HomeStack.Navigator
                screenOptions={defaultNativeHeaderOptions}
            >
                <HomeStack.Screen
                    name='HomeScreen'
                    component={StudentHome}
                    options={{ title: 'Beranda' }}
                />
            </HomeStack.Navigator>
        </NotCollabseAbleAndFlexOne>
    )
}

const AccountDetailStack = createNativeStackNavigator()
const AccountDetailStackScreens = () => {

    return (
        <NotCollabseAbleAndFlexOne>
            <AccountDetailStack.Navigator
                screenOptions={defaultNativeHeaderOptions}
            >
                <AccountDetailStack.Screen
                    name='Akun'
                    component={AccountDetails}
                />
            </AccountDetailStack.Navigator>
        </NotCollabseAbleAndFlexOne>
    )
}

const KeterlambatanStack = createNativeStackNavigator()
const KeterlambatanStackScreens = () => {

    return (
        <NotCollabseAbleAndFlexOne>
            <KeterlambatanStack.Navigator
                screenOptions={defaultNativeHeaderOptions}
            >
                <KeterlambatanStack.Screen
                    name='KeterlambatanScreen'
                    component={PersonalKeterlambatan}
                    options={{ title: 'Keterlambatan' }}
                />
            </KeterlambatanStack.Navigator>
        </NotCollabseAbleAndFlexOne>
    )
}

const StudentTabNavigationStack = createMaterialBottomTabNavigator()
const StudentTabNavigationStackScreens = () => {

    return (
        <StudentTabNavigationStack.Navigator
            barStyle={defaultMBTNavigationStyle}
            activeColor={VAR.darkBlue}
            inactiveColor={VAR.darkBlue}
            shifting={true}
            initialRouteName='Beranda'
        >

            <StudentTabNavigationStack.Screen
                name='Keterlambatan'
                component={KeterlambatanStackScreens}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused
                            ? <Ionicons name='document-text' size={24} color={VAR.darkBlue} />
                            : <Ionicons name='document-text-outline' size={24} color={VAR.darkBlue} />
                    ),
                }}

            />

            <StudentTabNavigationStack.Screen
                name='Beranda'
                component={HomeStackScreens}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused
                            ? <Ionicons name='home' size={24} color={VAR.darkBlue} />
                            : <Ionicons name='home-outline' size={24} color={VAR.darkBlue} />
                    ),
                }}
            />

            <StudentTabNavigationStack.Screen
                name='Account'
                component={AccountDetailStackScreens}
                options={{
                    title: 'Akun',
                    tabBarIcon: ({ focused }) => (
                        focused
                            ? <Ionicons name='person' size={24} color={VAR.darkBlue} />
                            : <Ionicons name='person-outline' size={24} color={VAR.darkBlue} />
                    ),
                }}
            />
        </StudentTabNavigationStack.Navigator>
    )
}


export default StudentTabNavigationStackScreens