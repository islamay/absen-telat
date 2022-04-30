import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyAccountDetail from '../screens/MyAccountDetail'
import NonCollapsable from '../components/NonCollapsable'

const MyAccountStack = createNativeStackNavigator()

const MyAccount = () => {
    return (
        <NonCollapsable>

            <MyAccountStack.Navigator initialRouteName='Detail'>
                <MyAccountStack.Screen
                    name='Detail'
                    component={MyAccountDetail}
                    options={{ headerShown: false }}
                />
            </MyAccountStack.Navigator>
        </NonCollapsable>
    )
}

export default MyAccount