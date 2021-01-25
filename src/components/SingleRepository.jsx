import React from 'react';
import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {FlatList, StyleSheet, View} from "react-native";
import {GET_REPOSITORY} from "../graphql/queries";
import theme from '../theme';
import Text from './Text';
import {format, parseISO} from 'date-fns'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    topContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ratingContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        textAlign: 'center',
        color: theme.colors.primary,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        paddingVertical: 10,
        marginRight: 20,
    },
    ratingText: {},
    nameText: {
        marginBottom: 5,
    },
    dateText: {
        flexGrow: 1,
        marginBottom: 10
    },
    separator: {
        height: 5,
        backgroundColor: theme.colors.separatorBackgroundL
    },
});

export const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryInfo = ({repository}) => {
    return (<RepositoryItem repository={repository} showGitHubLink={true}/>);
};

export const ReviewItem = ({review}) => {
    const createdAtFormatted = format(parseISO(review.createdAt), 'MM/dd/yyyy')
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.ratingContainer}>
                    {review.rating}
                </Text>
                <View style={styles.contentContainer}>
                    <Text
                        style={styles.nameText}
                        fontWeight="bold"
                        fontSize="subheading"
                        numberOfLines={66}>
                        {review.user.username}
                    </Text>
                    <Text style={styles.dateText} color="textSecondary">
                        {createdAtFormatted}
                    </Text>
                    <Text>
                        {review.text}
                    </Text>
                </View>
            </View>
        </View>
    )
};

const SingleRepository = () => {
    let {id} = useParams();
    const variables = {
        id: id,
        first: 3
    };
    const {data, loading, fetchMore} = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: variables
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data.repository && data.repository.reviews && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges]
                        }
                    },
                };

                return nextResult;
            },
        });
    };

    const repository = data && data.repository
        ? data.repository
        : {};
    const reviews = data && data.repository
        ? data.repository.reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({item}) => <ReviewItem review={item}/>}
            keyExtractor={({id}) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository}/>}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={handleFetchMore}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepository;