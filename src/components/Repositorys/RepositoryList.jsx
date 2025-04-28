import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (order === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (order === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
