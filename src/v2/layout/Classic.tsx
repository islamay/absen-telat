import { FontAwesome } from '@expo/vector-icons'
import { MaterialBottomTabNavigationProp, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { DrawerActions } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Typography from '../components/Typography'
import styleGuide from '../constants/styleGuide'

interface Header {
    title: string,
    subtitle?: string,
    icon: any,
    navigation?: any
}

interface Props {
    header: Header
}

export const ClassicBodyHeader: React.FC = ({ children }) => {
    return (
        <View style={styles.bodyHeader}>
            {children}
        </View>
    )
}

interface ClassicBodyContentsProps {
    withScrollView?: boolean
}

export const ClassicBodyContents: React.FC<ClassicBodyContentsProps> = ({ children, withScrollView = true }) => {
    return (
        <>
            {
                withScrollView
                    ?
                    <View style={styles.bodyContentContainer}>
                        <ScrollView contentContainerStyle={styles.bodyScrollContainer} showsVerticalScrollIndicator={false} children={children} />
                    </View>
                    : children
            }

        </>
    )
}

const Classic: React.FC<Props> = ({ header, children, }) => {



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    {
                        header && header.navigation ?
                            <View style={styles.headerTitleContainer}>
                                <TouchableOpacity onPress={() => { header.navigation?.dispatch(DrawerActions.openDrawer()) }}>
                                    <FontAwesome name='bars' size={32} color={styleGuide.colorWhite} />
                                </TouchableOpacity>
                                <Typography type='title' style={[styles.headerTitle, { marginLeft: 10 }]}>{header.title}</Typography>
                            </View>
                            : <Typography type='title' style={styles.headerTitle}>{header.title}</Typography>
                    }
                    <Typography type='body' >{header.subtitle}</Typography>
                </View>
                {header.icon}
            </View>
            <View style={styles.bodyContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: styleGuide.colorPrimary,
        justifyContent: 'space-between',
        ...styleGuide.shadow
    },
    header: {
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...styleGuide.shadow
    },
    headerTitleContainer: {
        flexDirection: 'row'
    },
    headerTitle: {
        color: styleGuide.colorWhite
    },
    bodyContainer: {
        height: '70%',
        flexShrink: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#F8F8F8',
    },
    bodyHeader: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 50,
        paddingVertical: 20,
        backgroundColor: styleGuide.colorWhite
    },
    bodyContentContainer: {
        flexGrow: 1,
        paddingBottom: 50
    },
    bodyScrollContainer: {
        padding: 30,

    }
})

export default Classic