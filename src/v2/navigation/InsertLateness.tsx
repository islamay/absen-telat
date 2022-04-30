import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertLatenessScreen from '../screens/ManualInsert'

export type InsertLatenessParamList = {
    Manual: undefined,
    Scan: undefined
}

const InsertLatenessStack = createNativeStackNavigator<InsertLatenessParamList>()
const InsertLateness = () => {

    return (
        <InsertLatenessStack.Navigator screenOptions={{ headerShown: false }}>
            <InsertLatenessStack.Screen
                name='Manual'
                component={InsertLatenessScreen}
            />
        </InsertLatenessStack.Navigator>
    )
}

export default InsertLateness