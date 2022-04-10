import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface Props {
    header: string,
    content: any,
}

const HeaderContent: React.FC<Props> = ({ header, content }) => {

    return (
        <Text style={styles.header}>{header} : <Text style={styles.content}>{content}</Text></Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '700'
    },
    content: {
        fontWeight: 'normal'
    }
})

export default HeaderContent