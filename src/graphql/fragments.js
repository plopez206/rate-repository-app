// src/graphql/fragments.js
// esto es para evitar repetir campos

import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
