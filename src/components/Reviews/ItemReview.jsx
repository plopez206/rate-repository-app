import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // la mitad de width/height
    borderWidth: 2,
    borderColor: '#0366d6', // azul bonito
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  createdAt: {
    color: 'gray',
    marginBottom: 5,
  },
  text: {
    color: 'black',
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.createdAt}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
