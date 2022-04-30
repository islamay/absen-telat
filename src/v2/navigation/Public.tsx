import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountType } from '../constants/account'
import ForgetPassword from '../screens/ForgetPassword'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

export type PublicStackParamList = {
    SignIn: {
        as: AccountType
    },
    SignUp: undefined,
    ForgetPassword: undefined
}

const PublicStack = createNativeStackNavigator<PublicStackParamList>()

const Public = () => {

    return (
        <PublicStack.Navigator screenOptions={{ headerShown: false }}>
            <PublicStack.Screen name='SignIn' initialParams={{ as: AccountType.SISWA }} component={SignIn} />
            <PublicStack.Screen name='SignUp' component={SignUp} />
            <PublicStack.Screen name='ForgetPassword' component={ForgetPassword} />
        </PublicStack.Navigator>
    )
}

export default Public