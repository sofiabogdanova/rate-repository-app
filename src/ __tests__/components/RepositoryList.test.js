import React from 'react';
import {RepositoryListContainer} from "../../components/RepositoryList";
import {render} from '@testing-library/react-native';
import formatInThousands from "../../utils/formatInThousands";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                pageInfo: {
                    totalCount: 8,
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            name: 'formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            name: 'react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            const {debug, getAllByTestId} = render(<RepositoryListContainer repositories={repositories}/>);
            debug();
            const repo1 = repositories.edges[0].node;
            const repo2 = repositories.edges[1].node;

            let items = getAllByTestId('repositoryItemDescription');
            expect(items[0]).toHaveTextContent(repo1.description);
            expect(items[1]).toHaveTextContent(repo2.description);

            items = getAllByTestId('repositoryItemName');
            expect(items[0]).toHaveTextContent(repo1.name);
            expect(items[1]).toHaveTextContent(repo2.name);

            items = getAllByTestId('repositoryItemStars');
            expect(items[0]).toHaveTextContent(formatInThousands(repo1.stargazersCount));
            expect(items[1]).toHaveTextContent(formatInThousands(repo2.stargazersCount));

            items = getAllByTestId('repositoryItemForks');
            expect(items[0]).toHaveTextContent(formatInThousands(repo1.forksCount));
            expect(items[1]).toHaveTextContent(formatInThousands(repo2.forksCount));

            items = getAllByTestId('repositoryItemReviews');
            expect(items[0]).toHaveTextContent(repo1.reviewCount);
            expect(items[1]).toHaveTextContent(repo2.reviewCount);

            items = getAllByTestId('repositoryItemRating');
            expect(items[0]).toHaveTextContent(repo1.ratingAverage);
            expect(items[1]).toHaveTextContent(repo2.ratingAverage);
        });
    });
});