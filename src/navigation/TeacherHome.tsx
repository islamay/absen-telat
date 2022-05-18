import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import LatenessStatistic from '../screens/LatenessStatistic'
import StudentData from '../screens/StudentData'
import TeacherData from '../screens/TeacherData'
import TeacherHomeScreen from '../screens/TeacherHome'
import TeacherProfile from '../screens/TeacherProfile'

export type TeacherHomeStackParamList = {
    Home: undefined,
    Profile: undefined,
    StudentData: undefined,
    TeacherData: undefined,
    LatenessStatistic: undefined,

}

const TeacherHomeStack = createDrawerNavigator<TeacherHomeStackParamList>()
const TeacherHome = () => {

    return (
        <TeacherHomeStack.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }}>
            <TeacherHomeStack.Screen name='Home' component={TeacherHomeScreen} />
            <TeacherHomeStack.Screen name='LatenessStatistic' component={LatenessStatistic} />
            <TeacherHomeStack.Screen name='StudentData' component={StudentData} />
            <TeacherHomeStack.Screen name='TeacherData' component={TeacherData} />
            <TeacherHomeStack.Screen name='Profile' component={TeacherProfile} />

        </TeacherHomeStack.Navigator>
    )
}

export default TeacherHome