// esto es para hacer posts
// src/graphql/mutations.js

import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

