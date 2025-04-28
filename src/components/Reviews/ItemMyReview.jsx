import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
  reviewText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const MyReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repository/${review.repository.id}`); // ¡Ojo aquí! es "repository", no "repositories"
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetch(); // Refrescamos la lista después de borrar
            } catch (e) {
              console.error(e);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Contenido principal del Review */}
      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text style={styles.username}>{review.repository.fullName}</Text>
          <Text style={styles.createdAt}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.viewButton]} 
          onPress={handleViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDeleteReview}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
