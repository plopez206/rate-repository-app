import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../../theme';
import ReviewItem from '../Reviews/ItemReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  content: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: 20,
  },
  button: {
    margin: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 3 },  // 👈 Importante añadir "first"
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  const onEndReach = () => {
    if (!loading && repository.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          id,
          first: 3,
          after: repository.reviews.pageInfo.endCursor, // 👈 Para seguir paginando
        },
      });
    }
  };

  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  const RepositoryInfo = () => (
    <View style={styles.content}>
      <RepositoryItem repository={repository} showGithubButton />
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={openGitHub}>
          Open in GitHub
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ListHeaderComponent={<RepositoryInfo />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default SingleRepositoryView;
