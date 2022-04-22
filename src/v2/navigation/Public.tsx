import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgetPassword from '../screens/ForgetPassword'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const PublicStack = createNativeStackNavigator()

const Public = () => {

    return (
        <PublicStack.Navigator screenOptions={{ headerShown: false }}>
            <PublicStack.Screen name='SignIn' component={SignIn} />
            <PublicStack.Screen name='SignUp' component={SignUp} />
            <PublicStack.Screen name='ForgetPassword' component={ForgetPassword} />
        </PublicStack.Navigator>
    )
}

export default Public