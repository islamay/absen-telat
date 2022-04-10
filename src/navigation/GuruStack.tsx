import GuruHome from '../screens/GuruHome'
import AbsenManual from '../screens/AbsenManual'
import AbsenWithScan from '../screens/AbsenWithScan'
import AccountDetails from '../screens/AccountDetails'
import DataKeterlambatan from '../screens/DataKeterlambatan'
import DataSiswa from '../screens/DataSiswa'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Test from '../screens/Test'
import SiswaAccount from '../screens/SiswaAccount'
import GuruData from '../screens/TeacherData'
import { defaultNativeHeaderOptions } from './defaultScreenOptions'
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import VAR from '../styles/VAR'

const DataKeterlambatanStack = createNativeStackNavigator()
const DataKeterlambatanScreens = () => {
    return (
        <DataKeterlambatanStack.Navigator
            screenOptions={defaultNativeHeaderOptions}
        >
            <DataKeterlambatanStack.Screen
                name='DataKeterlambatan'
                component={DataKeterlambatan}
                options={{ title: 'Keterlambatan' }}
            />
        </DataKeterlambatanStack.Navigator>
    )
}

const AbsenStack = createNativeStackNavigator()
const AbsenStackScreens = () => {
    return (
        <AbsenStack.Navigator
            initialRouteName='ChooseAbsenMethod'
            screenOptions={defaultNativeHeaderOptions}
        >
            <AbsenStack.Screen
                name='ChooseAbsenMethod'
                component={GuruHome}
                options={{ title: 'Absensi' }}
            />
            <AbsenStack.Screen
                name='AbsenManual'
                component={AbsenManual}
                options={{ title: 'Absen Manual' }}
            />
            <AbsenStack.Screen
                name='AbsenWithScan'
                component={AbsenWithScan}
                options={{ title: 'Scan Kode Qr' }}
            />
            <AbsenStack.Screen
                name='Test'
                component={Test}
            />
        </AbsenStack.Navigator>
    )
}

const DataSiswaStack = createNativeStackNavigator()
const DataSiswaStackScreens = () => {
    return (
        <DataSiswaStack.Navigator
            screenOptions={defaultNativeHeaderOptions}
        >
            <DataSiswaStack.Screen
                name='DataSiswa'
                options={{ title: 'Data Siswa' }}
                component={DataSiswa}
            />
        </DataSiswaStack.Navigator>
    )
}

const TeacherDataStack = createNativeStackNavigator()
const TeacherDataStackScreens = () => {
    return (
        <TeacherDataStack.Navigator
            screenOptions={defaultNativeHeaderOptions}
        >
            <TeacherDataStack.Screen
                name='TeacherData'
                options={{ title: 'Data Guru' }}
                component={GuruData}
            />
        </TeacherDataStack.Navigator>
    )
}

const AkunSiswaStack = createNativeStackNavigator()
const AkunSiswaStackScreens = () => {
    return (
        <AkunSiswaStack.Navigator
            screenOptions={defaultNativeHeaderOptions}
        >
            <AkunSiswaStack.Screen
                name='AkunSiswa'
                component={SiswaAccount}
                options={{ title: 'Akun Siswa' }}
            />

        </AkunSiswaStack.Navigator>
    )
}

const AccountDetailStack = createNativeStackNavigator()
const AccountDetailStackScreens = () => {

    return (
        <AccountDetailStack.Navigator screenOptions={defaultNativeHeaderOptions}>
            <AccountDetailStack.Screen
                name='AccountDetail'
                component={AccountDetails}
                options={{ title: 'Akun' }}
            />
        </AccountDetailStack.Navigator>
    )
}

const GuruDrawerStack = createDrawerNavigator()
const GuruDrawerStackScreens = () => {

    return (
        <GuruDrawerStack.Navigator screenOptions={{ headerShown: false, }}>
            <GuruDrawerStack.Screen
                name='Absensi'
                component={AbsenStackScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <MaterialIcons name='assignment' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
            <GuruDrawerStack.Screen
                name='Data Guru'
                component={TeacherDataStackScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <FontAwesome5 name='user-tie' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
            <GuruDrawerStack.Screen
                name='Data Siswa'
                component={DataSiswaStackScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <FontAwesome5 name='user-graduate' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
            <GuruDrawerStack.Screen
                name='Akun Siswa'
                component={AkunSiswaStackScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <FontAwesome5 name='user-friends' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
            <GuruDrawerStack.Screen
                name='Data Keterlambatan'
                component={DataKeterlambatanScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <MaterialIcons name='assignment' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
            <GuruDrawerStack.Screen
                name='Akun'
                component={AccountDetailStackScreens}
                options={{
                    drawerIcon: ({ focused }) => {
                        return <Ionicons name='settings-sharp' style={{ width: 30 }} size={24} color={focused ? VAR.darkBlue : VAR.secondaryBackgroundColor} />
                    }
                }}
            />
        </GuruDrawerStack.Navigator>
    )
}

export default GuruDrawerStackScreens