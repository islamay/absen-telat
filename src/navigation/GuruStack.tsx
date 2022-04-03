
import GuruHome from '../screens/GuruHome'
import AbsenManual from '../screens/AbsenManual'
import AbsenWithScan from '../screens/AbsenWithScan'
import AccountDetails from '../screens/AccountDetails'
import DataKeterlambatan from '../screens/DataKeterlambatan'
import DataSiswa from '../screens/DataSiswa'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import VAR from '../styles/VAR'
import Test from '../screens/Test'

const DataKeterlambatanStack = createNativeStackNavigator()
const DataKeterlambatanScreens = () => {
    return (
        <DataKeterlambatanStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: VAR.secondaryBackgroundColor
                },
                headerTitleStyle: {
                    color: VAR.darkBlue
                },
                headerTintColor: VAR.darkBlue
            }}
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
            screenOptions={{
                headerStyle: {
                    backgroundColor: VAR.secondaryBackgroundColor
                },
                headerTitleStyle: {
                    color: VAR.darkBlue
                },
                headerTintColor: VAR.darkBlue
            }}
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
            screenOptions={{
                headerStyle: {
                    backgroundColor: VAR.secondaryBackgroundColor
                },
                headerTitleStyle: {
                    color: VAR.darkBlue
                },
                headerTintColor: VAR.darkBlue
            }}
        >
            <DataSiswaStack.Screen
                name='DataSiswa'
                options={{ title: 'Data Siswa' }}
                component={DataSiswa}
            />
        </DataSiswaStack.Navigator>
    )
}

const GuruDrawerStack = createDrawerNavigator()
const GuruDrawerStackScreens = () => {

    return (
        <GuruDrawerStack.Navigator screenOptions={{ headerShown: false }}>
            <GuruDrawerStack.Screen
                name='Absensi'
                component={AbsenStackScreens}
            />
            <GuruDrawerStack.Screen
                name='Data Siswa'
                component={DataSiswaStackScreens}
            />
            <GuruDrawerStack.Screen
                name='Data Keterlambatan'
                component={DataKeterlambatanScreens}
            />
        </GuruDrawerStack.Navigator>
    )
}

const GuruStack = createBottomTabNavigator()
const GuruStackScreens = () => {
    return (
        <GuruStack.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: VAR.secondaryBackgroundColor
                },
                headerTitleStyle: {
                    color: VAR.darkBlue
                },
                headerShadowVisible: true,
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Beranda') {
                        const iconName = focused ? 'ios-home' : 'ios-home-outline'
                        return <Ionicons name={iconName} size={VAR.mediumFontSize} color={VAR.darkBlue} />

                    } else if (route.name === 'AccountDetails') {
                        const name = focused ? 'user-alt' : 'user'
                        return <FontAwesome5 name={name} size={VAR.mediumFontSize} color={VAR.darkBlue} />
                    }
                },
            })}
        >
            <GuruStack.Screen
                name='Beranda'
                component={GuruDrawerStackScreens}
                options={{ headerShown: false }}
            />

            <GuruStack.Screen
                name='AccountDetails'
                component={AccountDetails}
                options={{ title: 'Akun' }}
            />
        </GuruStack.Navigator>

    )
}

export default GuruStackScreens