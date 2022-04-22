import { NavigationContainer } from '@react-navigation/native'
import Public from './Public'
import Student from './Student'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TeacherHome from '../screens/TeacherHome'
import Teacher from './Teacher'

const RootStack = createNativeStackNavigator()

const Root = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>


                {/* <RootStack.Screen name='Public' component={Public} /> */}
                {/* <RootStack.Screen name='Student' component={Student} /> */}
                <RootStack.Screen name='TeacherStack' component={Teacher} />

            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Root