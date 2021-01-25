import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Redirect, Route, Switch} from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReviewForm";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.mainBackground,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar/>
            <Switch>
                <Route path="/" exact>
                    <RepositoryList/>
                </Route>
                <Route path="/sign-in" exact>
                    <SignIn/>
                </Route>
                <Route path="/repository/:id" exact>
                    <SingleRepository/>
                </Route>
                <Route path="/createReview" exact>
                    <CreateReview/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </View>
    );
};

export default Main;