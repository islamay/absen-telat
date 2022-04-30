import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import InsertLateness, { InsertLatenessParamList } from './InsertLateness'
import TeacherHome, { TeacherHomeStackParamList } from './TeacherHome'

export type TeacherStackParamList = {
    HomeStack: DrawerNavigationProp<TeacherHomeStackParamList>,
    Detail: undefined,
    InsertLateness: NativeStackNavigationProp<InsertLatenessParamList>
}

const TeacherStack = createNativeStackNavigator<TeacherStackParamList>()
const Teacher = () => {

    return (
        <TeacherStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeStack' >
            <TeacherStack.Screen name='HomeStack' component={TeacherHome} options={{ title: 'Beranda' }} />
            <TeacherStack.Screen name='InsertLateness' component={InsertLateness} />
        </TeacherStack.Navigator>
    )
}

export default Teacher