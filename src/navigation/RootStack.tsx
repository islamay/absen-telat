import AuthStackScreens from './GuestStack'
import AuthenticatedGuruTabStackScreens from './GuruStack'
import WaitingStackScreens from './WaitingStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'


const RootStack = createNativeStackNavigator()

const RootStackScreens = () => {
    const auth = useSelector(state => state)

    return (
        <NavigationContainer >
            <RootStack.Group screenOptions={{ headerShown: false }}>
                <RootStack.Screen
                    name='Public'
                    component={AuthStackScreens}
                />
                <RootStack.Screen
                    name='Guru'
                    component={AuthenticatedGuruTabStackScreens}
                />
                <RootStack.Screen
                    name='Waiting'
                    component={WaitingStackScreens}
                />
            </RootStack.Group>
        </NavigationContainer>
    )
}
