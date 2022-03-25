
import GuruHome from '../screens/GuruHome'
import AbsenManual from '../screens/AbsenManual'
import AbsenWithScan from '../screens/AbsenWithScan'
import AccountDetails from '../screens/AccountDetails'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import VAR from '../styles/VAR'
import Test from '../screens/Test'



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
                options={{ title: 'Beranda' }}
            />
            <AbsenStack.Screen
                name='AbsenManual'
                component={AbsenManual}
                options={{ title: 'Absen' }}
            />
            <AbsenStack.Screen
                name='AbsenWithScan'
                component={AbsenWithScan}
                options={{ title: 'Absen' }}
            />
            <AbsenStack.Screen
                name='Test'
                component={Test}
            />
        </AbsenStack.Navigator>
    )
}

const GuruDrawerStack = createDrawerNavigator()
const GuruDrawerStackScreens = () => {

    return (
        <GuruDrawerStack.Navigator>
            <GuruDrawerStack.Screen
                name='Absen'
                component={AbsenStackScreens}
                options={{ headerShown: false }}
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
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {
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
                name='AccountDetails'
                component={AccountDetails}
                options={{ title: 'Akun' }}
            />
        </GuruStack.Navigator>

    )
}

export default GuruStackScreens