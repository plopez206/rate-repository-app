import { render, screen, within } from '@testing-library/react-native';
import {RepositoryListContainer} from 'rate-repository-app/src/components/RepositoryListContainer.jsx'; // ← corrige también tu import aquí

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
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

      render(<RepositoryListContainer repositories={repositories} />);
      
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstItem, secondItem] = repositoryItems;

      const first = within(firstItem);
      expect(first.getByText('jaredpalmer/formik')).toBeDefined();
      expect(first.getByText('Build forms in React, without the tears')).toBeDefined();
      expect(first.getByText('TypeScript')).toBeDefined();
      expect(first.getByText('21.9k')).toBeDefined();
      expect(first.getByText('1.6k')).toBeDefined();
      expect(first.getByText('3')).toBeDefined();
      expect(first.getByText('88')).toBeDefined();

      const second = within(secondItem);
      expect(second.getByText('async-library/react-async')).toBeDefined();
      expect(second.getByText('Flexible promise-based React data loader')).toBeDefined();
      expect(second.getByText('JavaScript')).toBeDefined();
      expect(second.getByText('1.8k')).toBeDefined();
      expect(second.getByText('69')).toBeDefined();
      expect(second.getByText('3')).toBeDefined();
      expect(second.getByText('72')).toBeDefined();
    });
  });
});
