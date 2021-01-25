import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import {useApolloClient, useQuery} from "@apollo/client";
import {AUTHORIZED_USER} from "../graphql/queries";
import AuthStorageContext from '../contexts/AuthStorageContext';
import {useHistory} from "react-router-dom";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground,
    },
    scrollView: {
        flexDirection: 'row',
    },
    tabTouchable: {
        flexGrow: 0,
    },
    tabContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: 'white',
    },
});

const AppBarTab = ({children, ...props}) => {
    return (
        <TouchableWithoutFeedback style={styles.tabTouchable} {...props}>
            <View style={styles.tabContainer}>
                <Text fontWeight="bold" style={styles.tabText}>
                    {children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const AppBar = () => {
    const result = useQuery(AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network'
    });
    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();
    let history = useHistory();
    const user = result && result.data && result.data.authorizedUser
        ? result.data.authorizedUser
        : null;

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await client.resetStore();
    }

    const createReview = () => {
        history.push('/createReview')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} horizontal>
                <Link to="/" component={AppBarTab}>Repositories</Link>
                {!user && <Link to="/sign-in" component={AppBarTab}>Sign in</Link>}
                {user && <AppBarTab onPress={() => createReview()}>Create a review</AppBarTab>}
                {user && <AppBarTab onPress={() => signOut()}>Sign out</AppBarTab>}
            </ScrollView>
        </View>
    );
};

export default AppBar;