import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PersonalLate from '../screens/PersonalLate'
import PersonalLateDetail from '../screens/PersonalLateDetail'

export type StudentLateStackParamList = {
    LateHome: undefined,
    LateDetail: {
        date: Date
    }
}

const StudentLateStack = createNativeStackNavigator<StudentLateStackParamList>()
const StudentLate = () => {

    return (
        <StudentLateStack.Navigator initialRouteName='LateHome' screenOptions={{ headerShown: false }}>
            <StudentLateStack.Screen name='LateHome' component={PersonalLate} />
            <StudentLateStack.Screen name='LateDetail' component={PersonalLateDetail} />
        </StudentLateStack.Navigator>
    )
}

export default StudentLate