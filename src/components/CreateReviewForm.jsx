import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormikTextInput from "./FormikTextInput";
import Button from "./button";
import {useHistory} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('repository owner name is required'),
    repositoryName: yup.string().required('repository name is required'),
    rating: yup.number().required('rating is required').positive().integer().max(100),
    text: yup.string()
});

const CreateReviewForm = ({onSubmit}) => {
    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="ownerName"
                    placeholder="Repository owner name"/>
            </View>
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="repositoryName"
                    placeholder="Repository name"/>
            </View>
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="rating"
                    placeholder="Rating between 0 and 100"/>
            </View>
            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="text"
                    placeholder="Review"
                    multiline={true}/>
            </View>
            <Button onPress={onSubmit}>Create a review</Button>
        </View>
    )
}

const CreateReview = () => {
    const [createReview] = useCreateReview();
    let history = useHistory();
    const onSubmit = async (values) => {
        const {repositoryName, ownerName, rating, text} = values;
        const result = await createReview({repositoryName, ownerName, rating, text});
        const repositoryId = result.data.createReview.repositoryId;
        history.push(`/repository/${repositoryId}`);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <CreateReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default CreateReview;