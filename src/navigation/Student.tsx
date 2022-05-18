import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountType } from '../constants/account'
import ChangePassword from '../screens/ChangePassword'
import PersonalLateDetail from '../screens/PersonalLateDetail'
import { ILateness } from '../services/lateness'
import StudentHome, { StudentHomeStackParamList } from './StudentHome'

export type StudentStackParamList = {
    HomeStack: MaterialBottomTabNavigationProp<StudentHomeStackParamList>
    LatenessDetail: {
        id: string
    },
    ChangePassword: {
        accountType: AccountType
    }
}

const StudentStack = createNativeStackNavigator<StudentStackParamList>()
const Student = () => {


    return (
        <StudentStack.Navigator initialRouteName='HomeStack' screenOptions={{ headerShown: false }}>
            <StudentStack.Screen name='HomeStack' component={StudentHome} />
            <StudentStack.Group
                screenOptions={{ animation: 'slide_from_right' }}
            >
                <StudentStack.Screen name='LatenessDetail' component={PersonalLateDetail} />
                <StudentStack.Screen name='ChangePassword' component={ChangePassword} />
            </StudentStack.Group>
        </StudentStack.Navigator>
    )
}

export default Student