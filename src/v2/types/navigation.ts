import { NavigatorScreenParams } from '@react-navigation/native'

export type NestedNavigatorParams<ParamList> = {
    [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
    Student: StudentStackParamList
}

export type StudentStackParamList = {
    Home: undefined,
    Late: NavigatorScreenParams<StudentLateStackParamList>,
    MyAccount: undefined
}

export type StudentLateStackParamList = {
    LateHome: undefined,
    LateDetail: {
        date: Date
    }
}

export type TeacherStackParamList = {
    TeacherHome: undefined
}