import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AccountType } from '../constants/account'
import AddStudent from '../screens/AddTeacherOrStudent'
import LatenessDetail from '../screens/LatenessDetail'
import StudentDetail from '../screens/StudentDetail'
import TeacherDetail from '../screens/TeacherDetail'
import InsertLateness, { InsertLatenessParamList } from './InsertLateness'
import TeacherHome, { TeacherHomeStackParamList } from './TeacherHome'

export type TeacherStackParamList = {
    HomeStack: DrawerNavigationProp<TeacherHomeStackParamList>,
    Detail: undefined,
    InsertLateness: NavigatorScreenParams<InsertLatenessParamList>
    StudentDetail: {
        nis: string
    },
    TeacherDetail: {
        id: string
    },
    LatenessDetail: {
        id: string,
        name: string
    },
    AddTeacherOrStudent: {
        type: AccountType
    }
}

const TeacherStack = createNativeStackNavigator<TeacherStackParamList>()
const Teacher = () => {

    return (
        <TeacherStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeStack' >
            <TeacherStack.Screen name='HomeStack' component={TeacherHome} options={{ title: 'Beranda' }} />
            <TeacherStack.Screen name='InsertLateness' component={InsertLateness} />
            <TeacherStack.Group screenOptions={{ animation: 'slide_from_right' }}>
                <TeacherStack.Screen name='AddTeacherOrStudent' component={AddStudent} />
                <TeacherStack.Screen name='StudentDetail' component={StudentDetail} />
                <TeacherStack.Screen name='TeacherDetail' component={TeacherDetail} />
            </TeacherStack.Group>
        </TeacherStack.Navigator>
    )
}

export default Teacher



