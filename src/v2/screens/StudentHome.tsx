import React from 'react'
import { View, StyleSheet } from 'react-native'
import Classic, { ClassicBodyHeader, ClassicBodyContents } from '../layout/Classic'
import { FontAwesome } from '@expo/vector-icons'
import styleGuide from '../constants/styleGuide'
import Typography from '../components/Typography'
import Card from '../components/Card'
import QRCode from 'react-native-qrcode-svg'
import TextInput, { textInputTheme } from '../components/TextInput'
import { Theme } from 'react-native-paper/lib/typescript/types'
import { useAppSelector } from '../hooks/redux'

const StudentHome = () => {
    const student = useAppSelector(state => state.student)

    return (
        <Classic
            header={{
                title: 'Beranda',
                icon: <FontAwesome name="home" size={96} color={styleGuide.colorSecondary} />
            }}
        >
            <ClassicBodyHeader>
                <Typography type='title'>Kode QR</Typography>
            </ClassicBodyHeader>
            <ClassicBodyContents>
                <Card style={styles.customCard}>
                    <QRCode
                        value='sfkokoaksofkOSKDoiaskSKDopakdAOSDAPOKSPOKSADkzlldklksSAOKKASoidk)XkokcokxOASIFJOIJSAFIjkxmmfO)ISJAoia'
                        size={160}
                    />
                </Card>
                <View style={styles.identifierContainer}>
                    <TextInput
                        editable={false}
                        mode='outlined'
                        label='Nama'
                        value={student.name}
                        theme={customInputTheme}
                    />
                    <TextInput
                        editable={false}
                        mode='outlined'
                        label='Kelas'
                        value={student.fullClass}
                        theme={customInputTheme}
                    />
                </View>
            </ClassicBodyContents>
        </Classic>
    )
}

const customInputTheme: Theme = {
    ...textInputTheme,
    colors: {
        ...textInputTheme.colors,
        text: styleGuide.colorTertiary,
        primary: styleGuide.colorSecondary,
        placeholder: styleGuide.colorSecondary
    },
}

const styles = StyleSheet.create({
    customCard: {
        alignSelf: 'center',
        padding: 20,
        marginBottom: 20,
    },
    identifierContainer: {
        paddingHorizontal: 20
    }
})

export default StudentHome