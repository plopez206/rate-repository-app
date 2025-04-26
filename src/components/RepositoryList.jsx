import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'; // Asegúrate de tener este archivo creado
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  separator: {
    height: 10,
  }
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories} = useRepositories();

  const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem repository={item} />
      )}
    />
  );
};

export default RepositoryList;
