import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Text from "./Text";
import theme from "../theme";
import {Row, Rows, Table} from "react-native-table-component";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff'
    },
    head: {
        height: 40
    },
    logo: {
        width: 66,
        height: 58,
    },
    text: {
        color: theme.colors.primary,
        margin: 6
    },
    textRating: {
        color: theme.colors.textSecondary,
        margin: 6,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold
    },
    textHeading: {
        color: theme.colors.textSecondary
    }
});

const RepositoryItem = ({repo}) => {
    const heading = ['Stars', 'Forks', 'Reviews', 'Rating'];
    const ratings = [
        formatNumber(repo.stargazersCount),
        formatNumber(repo.forksCount),
        formatNumber(repo.reviewCount),
        formatNumber(repo.ratingAverage)
    ];
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: repo.ownerAvatarUrl}}/>
            <Text fontSize="subheading" fontWeight="bold">{repo.fullName}</Text>
            <Text fontSize="subheading" color="textSecondary">{repo.description}</Text>
            <Text style={styles.text}>{repo.language}</Text>
            <View style={styles.container}>
                <Table>
                    <Row data={ratings} style={styles.head} textStyle={styles.textRating}/>
                    <Row data={heading} style={styles.head} textStyle={styles.textHeading}/>
                </Table>
            </View>
        </View>
    );
};

const formatNumber = (number) => {
    if (number<1000) {
        return number;
    }
    const thousands = Math.trunc(number/1000);
    return `${thousands}k`;
};

export default RepositoryItem;