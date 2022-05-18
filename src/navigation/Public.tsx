import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountType } from '../constants/account'
import ForgetPassword from '../screens/ForgetPassword'
import RequestChangePassword from '../screens/RequestChangePassword'
import SignIn from '../screens/SignIn'
import StudentSignIn from '../screens/StudentSignIn'
import TeacherSignIn from '../screens/TeacherSignIn'
import Constants from 'expo-constants'

export type PublicStackParamList = {
    StudentSignIn: undefined,
    TeacherSignIn: undefined,
    SignUp: undefined,
    RequestChangePassword: {
        accountType: AccountType
    }
}

const PublicStack = createNativeStackNavigator<PublicStackParamList>()

const Public = () => {

    return (
        <PublicStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='TeacherSignIn'>
            <PublicStack.Screen name='TeacherSignIn' component={TeacherSignIn} />
            <PublicStack.Screen name='StudentSignIn' component={StudentSignIn} />
            <PublicStack.Screen name='RequestChangePassword' component={RequestChangePassword} />
        </PublicStack.Navigator>
    )
}

export default Public