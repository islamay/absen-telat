
import GuruHome from '../screens/GuruHome'
import AbsenManual from '../screens/AbsenManual'
import AbsenWithScan from '../screens/AbsenWithScan'
import AccountDetails from '../screens/AccountDetails'
import {Ionicons, FontAwesome5} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import VAR from '../styles/VAR'

const GuruHomeStack = createNativeStackNavigator()
const GuruHomeStackScreens = () => {

    return (
        <GuruHomeStack.Navigator
            initialRouteName='GuruHome'
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
            <GuruHomeStack.Screen
                name='GuruHome'
                component={GuruHome}
                options={{title: 'Beranda'}}
            />
            <GuruHomeStack.Screen 
                name='AbsenManual'
                component={AbsenManual}
                options={{title: 'Absen'}}
            />
            <GuruHomeStack.Screen
                name='AbsenWithScan'
                component={AbsenWithScan}
                options={{title: 'Absen'}}
            />
        </GuruHomeStack.Navigator>
    )
}

const AuthenticatedTabStack = createBottomTabNavigator()
const AuthenticatedTabStackScreens = () => {
    return (
        <AuthenticatedTabStack.Navigator
            initialRouteName={'GuruHome'}
            screenOptions={({route}) => ({
                headerStyle: {
                    backgroundColor: VAR.secondaryBackgroundColor
                },
                headerTitleStyle: {
                    color: VAR.darkBlue
                },
                tabBarIcon: ({focused}) => {
                    if (route.name === 'GuruHomeStack') {
                        const iconName = focused ? 'ios-home' : 'ios-home-outline'
                        return <Ionicons name={iconName} size={VAR.mediumFontSize} color={VAR.darkBlue}/>
                    
                    } else if (route.name === 'AccountDetails') {
                        const name = focused ? 'user-alt' : 'user'
                        return <FontAwesome5 name={name} size={VAR.mediumFontSize} color={VAR.darkBlue} />
                    }
                },
            })}
        >
            <AuthenticatedTabStack.Screen
                name='GuruHomeStack'
                component={GuruHomeStackScreens}
                options={{headerShown: false, title: 'Beranda'}}
            />
            <AuthenticatedTabStack.Screen 
                name='AccountDetails'
                component={AccountDetails}
                options={{title: 'Akun'}}
            />
        </AuthenticatedTabStack.Navigator>
            
    )
}

export default AuthenticatedTabStackScreens