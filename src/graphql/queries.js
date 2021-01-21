import {gql} from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query{
  repositories{
    edges{
      node{
        ownerName
        ownerAvatarUrl
        reviewCount
        ratingAverage
        stargazersCount
        forksCount
        name
        id
      }
    }
  }
}
`;

// other queries...