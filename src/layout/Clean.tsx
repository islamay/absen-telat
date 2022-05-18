import React, { Children } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import styleGuide from '../constants/styleGuide'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome } from '@expo/vector-icons'
import Typography from '../components/Typography'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface Props {
    scrollable?: boolean,
    refreshControl?: any,
    header?: CleanHeaderProps
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

const Clean: React.FC<Props> = ({ children, scrollable, refreshControl, header }) => {

    if (scrollable) return (
        <View style={styles.container}>
            {
                header && (
                    <CleanHeader
                        title={header.title}
                        withBackButton={header.withBackButton}
                    />
                )
            }
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollableContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={refreshControl}

            >
                {children}
            </KeyboardAwareScrollView>
        </View>
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
    scrollableContainer: {
        flexGrow: 1
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