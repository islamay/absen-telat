import React from 'react'
import { StyleSheet, View } from 'react-native'
import Classic, { ClassicBodyContents, ClassicBodyHeader } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import Typography from '../components/Typography'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Card from '../components/Card'
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { TeacherStackParamList } from '../types/navigation'

type Props = MaterialBottomTabScreenProps<TeacherStackParamList, 'TeacherHome'>

const TeacherHome: React.FC<Props> = ({ navigation }) => {

    const handleManualMethodButton = () => {

    }

    const handleScanMethodButton = () => {

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
                    <Card >
                        <TouchableOpacity onPress={handleManualMethodButton} style={styles.methodButton}>
                            <FontAwesome size={24} name='pencil' color={styleGuide.colorTertiary} style={styles.methodButtonIcon} />
                            <Typography style={styles.methodButtonText}>Manual</Typography>
                        </TouchableOpacity>
                    </Card>
                    <Card >
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
        justifyContent: 'space-around'
    },
    methodButton: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        color: styleGuide.colorTertiary
    },
    methodButtonIcon: {
        alignSelf: 'center'
    },
    methodButtonText: {
        color: styleGuide.colorPrimary
    }
})

export default TeacherHome