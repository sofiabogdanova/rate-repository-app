import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8'
    },
});

const Main = () => {
    return (
        <View>
            <TouchableWithoutFeedback>
                <AppBar/>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <RepositoryList/>
            </View>
        </View>

    );
};

export default Main;