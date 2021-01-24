import React, {useState} from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {SignInForm} from "../../components/SignIn";
import {Formik} from "formik";
import TextInput from "../../components/TextInput";
import Text from "../../components/Text";

class View extends React.Component {
    render() {
        return null;
    }
}

class TouchableWithoutFeedback extends React.Component {
    render() {
        return null;
    }
}

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button

            //arrange
            const onSubmit = jest.fn();
            const initialValues = {
                username: '',
                password: '',
            };
            const { getByTestId } = render(
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
                </Formik>
            )

            //act
            await act(async () => {
                await fireEvent.changeText(getByTestId('usernameField'), 'kalle');
            });
            await act(async () => {
                await fireEvent.changeText(getByTestId('passwordField'), 'password');
            });
            await act(async () => {
                await fireEvent.press(getByTestId('submitButton'));
            });
            //assert
            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                // onSubmit.mock.calls[0][0] contains the first argument of the first call
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        });
    });
});