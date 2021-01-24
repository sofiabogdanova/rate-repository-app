const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        appBarBackground: '#24292e',
        separatorBackgroundL: '#D3D3D3'
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts:
   // { fontFamily: 'Arial'},
        Platform.select({
            ios: {fontFamily: 'Arial',},
            android: {fontFamily: 'Roboto'},
            default: {fontFamily: 'System'}
        }),
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;