import { NavigationContainer } from '@react-navigation/native'
import Public from './Public'
import Student from './Student'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TeacherHome from '../screens/TeacherHome'
import Teacher from './Teacher'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import backendApi from '../utils/backend'
import { AccountType } from '../constants/account'

const RootStack = createNativeStackNavigator()

const Root = () => {
    const auth = useSelector((state: RootState) => state.auth)
    console.log(auth);


    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>

                {
                    !auth.isAuthenticated
                        ? <RootStack.Screen name='Public' component={Public} />
                        : auth.type === AccountType.SISWA
                            ? <RootStack.Screen name='Student' component={Student} />
                            : <RootStack.Screen name='TeacherStack' component={Teacher} />
                }

            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Root