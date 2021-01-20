const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        appBarBackground: '#24292e',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts:
        Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' },
            default: { fontFamily: 'System'}
        })
    ,
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;