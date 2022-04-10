import { StyleProp, ViewStyle } from 'react-native'
import { DrawerNavigationOptions } from '@react-navigation/drawer'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { } from '@react-navigation/material-bottom-tabs'
import VAR from '../styles/VAR'

const defaultHeaderStyling = {
    headerStyle: {
        backgroundColor: VAR.secondaryBackgroundColor
    },
    headerTitleStyle: {
        color: VAR.darkBlue
    },
    headerTintColor: VAR.darkBlue
}

export const defaultNativeHeaderOptions: NativeStackNavigationOptions = {
    ...defaultHeaderStyling
}

export const defaultDrawerHeaderOptions: DrawerNavigationOptions = {
    ...defaultHeaderStyling,
}

export const defaultMBTNavigationStyle: StyleProp<ViewStyle> = {
    position: 'relative',
    backgroundColor: VAR.secondaryBackgroundColor,
    paddingHorizontal: 40
}