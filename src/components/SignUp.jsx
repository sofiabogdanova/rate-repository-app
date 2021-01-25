import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useHistory} from "react-router-dom";

import Button from './button';
import FormikTextInput from './FormikTextInput';
import useSignUp from "../hooks/useSignUp";

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
    passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Password confirmation is required')
});

export const SignUpForm = ({onSubmit}) => {
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
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="passwordConfirmation"
                    placeholder="Password confirmation"
                    secureTextEntry
                />
            </View>
            <Button onPress={onSubmit}>Sign up</Button>
        </View>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    let history = useHistory();
    const onSubmit = async (values) => {
        const {username, password} = values;

        await signUp({username, password});

        history.push('/');
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default SignUp;