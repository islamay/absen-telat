import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PersonalLateDetail from '../screens/PersonalLateDetail'
import { ILateness } from '../services/lateness'
import StudentHome, { StudentHomeStackParamList } from './StudentHome'

export type StudentStackParamList = {
    HomeStack: MaterialBottomTabNavigationProp<StudentHomeStackParamList>
    LatenessDetail: ILateness
}

const StudentStack = createNativeStackNavigator<StudentStackParamList>()
const Student = () => {


    return (
        <StudentStack.Navigator initialRouteName='HomeStack' screenOptions={{ headerShown: false }}>
            <StudentStack.Screen name='HomeStack' component={StudentHome} />
            <StudentStack.Screen name='LatenessDetail' component={PersonalLateDetail} options={{ animation: 'slide_from_right' }} />
        </StudentStack.Navigator>
    )
}

export default Student