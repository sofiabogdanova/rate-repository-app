import {gql} from 'apollo-boost';

export const LOGIN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
mutation createReview($review: CreateReviewInput!) {
  createReview(review: $review) {
    repositoryId
  }
}
`;