import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styleGuide from '../constants/styleGuide'
import Card from './Card'
import Typography from './Typography'

interface Props {
    nis: string,
    name: string,
    fullClass: string,
    onCardPress?: () => void
}

const StudentCard: React.FC<Props> = ({ nis, name, fullClass, onCardPress }) => {

    return (
        <Card style={styles.cardStyle}>
            <TouchableOpacity onPress={onCardPress} style={styles.container}>
                <View>
                    <Typography type='body' style={styles.text}>{name}</Typography>
                    <Typography style={styles.text}>{fullClass}</Typography>
                </View>
            </TouchableOpacity>
            <FontAwesome name='angle-right' size={styleGuide.fontBig + 6} color={styleGuide.colorTertiary} style={styles.icon} />
        </Card>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    container: {
        padding: 10,
        flex: 1
    },
    text: {
        color: styleGuide.colorTertiary,
    },
    icon: {
        alignSelf: 'center'
    }
})

export default StudentCard