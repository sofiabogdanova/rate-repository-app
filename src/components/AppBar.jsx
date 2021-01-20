import React from 'react';
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground,
        height: 100
    }
});

const AppBar = () => {
    return <View style={styles.container}>
        <Text color="textSecondary" fontSize="subheading" fontWeight="bold">Repositories</Text>
    </View>;
};

export default AppBar;