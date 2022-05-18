import React from 'react'
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native'
import styleGuide, { Fonts } from '../constants/styleGuide'

type type = 'title' | 'body' | 'tiny';
interface Props {
    type?: type,
    style?: StyleProp<TextStyle>
    font?: Fonts.KanitSemiBold | string
    onPress?: () => void
}

const Typography: React.FC<Props> = ({ children, type = 'tiny', style, onPress }) => {

    return (
        <Text
            onPress={onPress}
            style={[type === 'title'
                ? styles.title
                : type === 'tiny'
                    ? styles.tiny
                    : styles.body,
                style
            ]}
        >{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: styleGuide.KanitFont.semibold,
        fontSize: styleGuide.fontBig,
        color: styleGuide.colorTertiary
    },
    body: {
        fontSize: styleGuide.fontMedium,
        color: styleGuide.colorGray
    },
    tiny: {
        fontSize: styleGuide.fontSmall,
        color: styleGuide.colorGray
    }
})

export default Typography