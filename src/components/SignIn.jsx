import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useHistory} from "react-router-dom";

import Button from './button';
import FormikTextInput from './FormikTextInput';
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    fieldContainer: {
        marginBottom: 15,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

export const SignInForm = ({onSubmit}) => {
    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <FormikTextInput name="username" placeholder="Username"/>
            </View>
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                />
            </View>
            <Button onPress={onSubmit} testID="submitButton">Sign in</Button>
        </View>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory();
    const onSubmit = async (values) => {
        const {username, password} = values;

        await signIn({username, password});

        history.push('/');
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default SignIn;