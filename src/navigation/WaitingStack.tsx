import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Waiting from '../screens/Waiting'


const WaitingStack = createNativeStackNavigator()
const WaitingStackScreens = () => {

    return (
        <WaitingStack.Navigator initialRouteName={'Waiting'}>
            <WaitingStack.Screen 
                name='Waiting'
                component={Waiting}
                options={{
                    headerShown: false,
                }}
            />
        </WaitingStack.Navigator>
    )
}

export default WaitingStackScreens