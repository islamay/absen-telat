import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import styleGuide from '../constants/styleGuide'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import MyAccount from './MyAccount'
import PersonalLate from '../screens/PersonalLate'
import StudentHomeScreen from '../screens/StudentHome'

export type StudentHomeStackParamList = {
    Home: undefined,
    Late: undefined,
    MyAccount: undefined
}

const StudentHomeStack = createMaterialBottomTabNavigator<StudentHomeStackParamList>()

const StudentHome = () => {
    return (
        <StudentHomeStack.Navigator
            barStyle={{ ...StudentBottomTabStyle.barStyle }}
            labeled={false}
            activeColor={styleGuide.colorSecondary}
            inactiveColor={styleGuide.colorLightGray}
            initialRouteName='Home'
        >
            <StudentHomeStack.Screen
                name='Home'
                component={StudentHomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome size={24} name='home' color={color} />
                    },
                }}
            />
            <StudentHomeStack.Screen
                name='Late'
                component={PersonalLate}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome size={24} name='file' color={color} />
                    },
                }}
            />
            <StudentHomeStack.Screen
                name='MyAccount'
                component={MyAccount}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome size={24} name='user' color={color} />
                    }
                }}
            />
        </StudentHomeStack.Navigator>
    )
}

const StudentBottomTabStyle = StyleSheet.create({
    barStyle: {
        backgroundColor: styleGuide.colorWhite,
        ...styleGuide.shadow
    }
})

export default StudentHome