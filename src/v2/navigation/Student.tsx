import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import StudentHome from '../screens/StudentHome'
import styleGuide from '../constants/styleGuide'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import MyAccount from './MyAccount'
import StudentLate from './StudentLate'
import PersonalLate from '../screens/PersonalLate'

export type StudentStackParamList = {
    Home: undefined,
    LateStack: undefined,
    MyAccount: undefined
}

const StudentStack = createMaterialBottomTabNavigator<StudentStackParamList>()

const StudentScreen = () => {
    const route = useRoute()

    return (
        <StudentStack.Navigator
            barStyle={{ ...StudentBottomTabStyle.barStyle, display: route.name === 'LateDetail' ? 'none' : 'flex' }}
            labeled={false}
            activeColor={styleGuide.colorSecondary}
            inactiveColor={styleGuide.colorLightGray}
        >
            <StudentStack.Screen
                name='Home'
                component={StudentHome}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome size={24} name='home' color={color} />
                    },
                }}
            />
            <StudentStack.Screen
                name='LateStack'
                component={PersonalLate}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome size={24} name='file' color={color} />
                    },
                }}
            />
            <StudentStack.Screen
                name='MyAccount'
                component={MyAccount}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome size={24} name='user' color={color} />
                    }
                }}
            />
        </StudentStack.Navigator>
    )
}

const StudentBottomTabStyle = StyleSheet.create({
    barStyle: {
        backgroundColor: styleGuide.colorWhite,
        ...styleGuide.shadow
    }
})

export default StudentScreen