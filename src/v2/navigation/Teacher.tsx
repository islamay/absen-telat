import { createDrawerNavigator } from '@react-navigation/drawer'
import TeacherHome from '../screens/TeacherHome'
import { TeacherStackParamList } from '../types/navigation'


const TeacherStack = createDrawerNavigator()
const Teacher = () => {

    return (
        <TeacherStack.Navigator screenOptions={{ headerShown: false }} >
            <TeacherStack.Screen name='TeacherHome' component={TeacherHome} options={{ title: 'Beranda', }} />
        </TeacherStack.Navigator>
    )
}

export default Teacher