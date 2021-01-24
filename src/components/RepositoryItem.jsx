import React from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import theme from '../theme';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';
import Button from "./button";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    topContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    avatarContainer: {
        flexGrow: 0,
        marginRight: 20,
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1,
    },
    nameText: {
        marginBottom: 5,
    },
    descriptionText: {
        flexGrow: 1,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: theme.roundness,
    },
    countItem: {
        flexGrow: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    countItemCount: {
        marginBottom: 5,
    },
    languageContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    languageText: {
        color: 'white',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.roundness,
        flexGrow: 0,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    gitHubButton: {
        marginTop: 5,
        borderRadius: 10
    }
});

const CountItem = ({label, count}) => {
    const testId = `repositoryItem${label}`;
    return (
        <View style={styles.countItem}>
            <Text style={styles.countItemCount} fontWeight="bold" testID={testId}>
                {formatInThousands(count)}
            </Text>
            <Text color="textSecondary">{label}</Text>
        </View>
    );
};

const RepositoryItem = ({repository, showGitHubLink}) => {
        const {
            name,
            description,
            language,
            forksCount,
            stargazersCount,
            ratingAverage,
            reviewCount,
            ownerAvatarUrl,
            url
        } = repository;

        const openGitHub = () => {
            Linking.openURL(url);
        }

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.avatarContainer}>
                        <Image source={{uri: ownerAvatarUrl}} style={styles.avatar}/>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text
                            style={styles.nameText}
                            fontWeight="bold"
                            fontSize="subheading"
                            numberOfLines={1}
                            testID="repositoryItemName"
                        >
                            {name}
                        </Text>
                        <Text style={styles.descriptionText} color="textSecondary" testID="repositoryItemDescription">
                            {description}
                        </Text>
                        {language ? (
                            <View style={styles.languageContainer}>
                                <Text style={styles.languageText}>{language}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <CountItem count={stargazersCount} label="Stars"/>
                    <CountItem count={forksCount} label="Forks"/>
                    <CountItem count={reviewCount} label="Reviews"/>
                    <CountItem count={ratingAverage} label="Rating"/>
                </View>
                {showGitHubLink && <Button style={styles.gitHubButton} onPress={openGitHub}>Open GitHub</Button>}
            </View>
        );
    }
;

export default RepositoryItem;