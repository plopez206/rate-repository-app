import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries'; // tu query que incluye reviews
import MyReviewItem from './ItemMyReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return null; // o un loading spinner
  }

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <MyReviewItem review={item} refetch={refetch} />
      )}
    />
  );
};

export default MyReviews;
