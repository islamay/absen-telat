import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import LatenessStatistic from '../screens/LatenessStatistic'
import Statistic from '../screens/Statistic'
import StudentData from '../screens/StudentData'
import TeacherData from '../screens/TeacherData'
import TeacherHomeScreen from '../screens/TeacherHome'
import TeacherProfile from '../screens/TeacherProfile'
import ViolationStatistic from '../screens/ViolationStatistic'

export type TeacherHomeStackParamList = {
    Home: undefined,
    Statistic: undefined,
    StudentData: undefined,
    TeacherData: undefined,
    Profile: undefined,
    LatenessStatistic: undefined,
    ViolationStatistic: undefined
}

const TeacherHomeStack = createDrawerNavigator<TeacherHomeStackParamList>()
const TeacherHome = () => {

    return (
        <TeacherHomeStack.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }}>
            <TeacherHomeStack.Screen name='Home' component={TeacherHomeScreen} />
            <TeacherHomeStack.Screen name='Statistic' component={Statistic} />
            <TeacherHomeStack.Screen name='LatenessStatistic' component={LatenessStatistic} />
            <TeacherHomeStack.Screen name='ViolationStatistic' component={ViolationStatistic} />
            <TeacherHomeStack.Screen name='StudentData' component={StudentData} />
            <TeacherHomeStack.Screen name='TeacherData' component={TeacherData} />
            <TeacherHomeStack.Screen name='Profile' component={TeacherProfile} />
        </TeacherHomeStack.Navigator>
    )
}

export default TeacherHome