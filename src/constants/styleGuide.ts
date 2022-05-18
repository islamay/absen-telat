export enum Fonts {
    KanitSemiBold = 'Kanit-SemiBold'
}

const styleGuide = {
    colorPrimary: '#768CFF',
    colorSecondary: '#8C9EFF',
    colorTertiary: '#6075E3',
    colorGradient: '',
    colorWarning: '#FFDD75',
    colorDanger: '#FF8FA0',
    colorWhite: '#ffffff',
    colorBlack: '#000000',
    colorGray: '#888888',
    colorLightGray: '#CFCFCF',
    fontBig: 24,
    fontMedium: 16,
    fontSmall: 14,
    KanitFont: {
        semibold: Fonts.KanitSemiBold
    },
    screenHorizontalPadding: 50,
    shadow: {
        shadowColor: "#b5b5b5",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
}

export default styleGuide