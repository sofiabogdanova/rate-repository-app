import React from 'react';
import {useQuery} from "@apollo/client";
import {AUTHORIZED_USER} from "../graphql/queries";
import {FlatList} from "react-native";
import {ItemSeparator, ReviewItem} from "./SingleRepository";

const MyReviews = () => {
    const result = useQuery(AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews: true
        }
    });
    const reviews = result && result.data && result.data.authorizedUser
        ? result.data.authorizedUser.reviews.edges.map(edge => edge.node)
        : [];
    return (
        <FlatList
            data={reviews}
            renderItem={({item}) => <ReviewItem review={item}/>}
            keyExtractor={({id}) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;