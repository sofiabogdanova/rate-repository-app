import {gql} from 'apollo-boost';

export const AUTHORIZED_USER = gql`
query{
  authorizedUser {
    id
    username
  }
}`

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
        description
        language
        name
        fullName
        url
        id
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query repository($id: ID!){
  repository(id: $id) {
        ownerName
        ownerAvatarUrl
        reviewCount
        ratingAverage
        stargazersCount
        forksCount
        description
        language
        name
        fullName
        url
        id
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
      }
    }
`;