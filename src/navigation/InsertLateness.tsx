import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertLatenessScreen from '../screens/ManualInsert'
import ScanLateness from '../screens/ScanLateness';

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
            <InsertLatenessStack.Screen
                name='Scan'
                component={ScanLateness}
            />
        </InsertLatenessStack.Navigator>
    )
}

export default InsertLateness