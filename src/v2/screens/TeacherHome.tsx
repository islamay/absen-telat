import React from 'react'
import { StyleSheet, View } from 'react-native'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import Typography from '../components/Typography'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Card from '../components/Card'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { TeacherHomeStackParamList } from '../navigation/TeacherHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { InsertLatenessParamList } from '../navigation/InsertLateness'
import { TeacherStackParamList } from '../navigation/Teacher'
import { DrawerScreenProps } from '@react-navigation/drawer'

type ScreenProps = CompositeScreenProps<
    NativeStackScreenProps<TeacherStackParamList, 'HomeStack'>,
    DrawerScreenProps<TeacherHomeStackParamList, 'Home'>
>

const TeacherHome: React.FC<ScreenProps> = ({ navigation }) => {

    const handleManualMethodButton = () => {
        navigation.navigate('InsertLateness', {
            screen: 'Manual'
        })
    }

    const handleScanMethodButton = () => {
        navigation.navigate('InsertLateness', {
            screen: 'Scan'
        })
    }

    return (
        <Classic
            header={{
                title: 'Beranda',
                icon: <FontAwesome size={96} name='home' color={styleGuide.colorSecondary} />,
                navigation: navigation
            }}
        >
            <ClassicBodyHeader>
                <Typography type='title'>Pilih metode absensi</Typography>
            </ClassicBodyHeader>
            <ClassicBodyContents>
                <View style={styles.container}>
                    <Card style={styles.buttonContainer} >
                        <TouchableOpacity onPress={handleManualMethodButton} style={styles.methodButton}>
                            <FontAwesome size={24} name='pencil' color={styleGuide.colorTertiary} style={styles.methodButtonIcon} />
                            <Typography style={styles.methodButtonText}>Manual</Typography>
                        </TouchableOpacity>
                    </Card>
                    <Card style={styles.buttonContainer} >
                        <TouchableOpacity onPress={handleScanMethodButton} style={styles.methodButton}>
                            <FontAwesome size={24} name='camera' color={styleGuide.colorTertiary} style={styles.methodButtonIcon} />
                            <Typography style={styles.methodButtonText}>Scan</Typography>
                        </TouchableOpacity>
                    </Card>
                </View>
            </ClassicBodyContents>
        </Classic>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    buttonContainer: {
        marginVertical: 5
    },
    methodButton: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        color: styleGuide.colorTertiary,
    },
    methodButtonIcon: {
        alignSelf: 'center'
    },
    methodButtonText: {
        color: styleGuide.colorPrimary
    }
})

export default TeacherHome