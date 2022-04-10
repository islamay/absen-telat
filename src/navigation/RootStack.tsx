import AuthStack from './GuestStack'
import TeacherStack from './GuruStack'
import WaitingStack from './WaitingStack'
import StudentStack from './StudentStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import VAR from '../styles/VAR'


const RootStack = createNativeStackNavigator()

const RootStackScreens = () => {
    const auth = useSelector((state: RootState) => state.auth)

    return (
        <NavigationContainer >
            <RootStack.Navigator screenOptions={{ headerShown: false }} >

                {
                    auth.isAuthenticated
                        ? auth.status === 'MENUNGGU'
                            ? <RootStack.Screen name='Waiting' component={WaitingStack} />
                            : auth.type === 'GURU'
                                ? <RootStack.Screen name='Teacher' component={TeacherStack} />
                                : <RootStack.Screen name='Student' component={StudentStack} />

                        : <RootStack.Screen name='Guest' component={AuthStack} />
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackScreens