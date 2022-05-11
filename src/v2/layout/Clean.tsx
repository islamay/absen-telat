import React, { Children } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import styleGuide from '../constants/styleGuide'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome } from '@expo/vector-icons'
import Typography from '../components/Typography'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface Props {
    scrollable?: boolean
}

interface CleanHeaderProps {
    withBackButton?: boolean,
    title: string
}

export const CleanHeader: React.FC<CleanHeaderProps> = ({ children, title, withBackButton = true }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            {
                withBackButton && (
                    <TouchableOpacity onPress={navigation.goBack}>
                        <FontAwesome name='angle-left' size={32} color={styleGuide.colorTertiary} />
                    </TouchableOpacity>
                )

            }
            <Typography style={withBackButton && styles.headerTitle} type='title'>{title}</Typography>

        </View>
    )
}

const Clean: React.FC<Props> = ({ children, scrollable }) => {

    if (scrollable) return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {children}
        </KeyboardAwareScrollView>
    )

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleGuide.colorWhite,
        flexGrow: 1,
        paddingTop: StatusBar.currentHeight
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 0,
        marginBottom: 40
    },
    headerTitle: {
        marginLeft: 20,
    }
})

export default Clean