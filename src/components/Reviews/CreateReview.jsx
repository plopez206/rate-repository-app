import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: '#0255b3', // un azul más oscuro
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
    marginTop: -5,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const review = {
          ownerName: values.ownerName,
          repositoryName: values.repositoryName,
          rating: Number(values.rating),
          text: values.text,
        };
        const data = await createReview(review);
        navigate(`/repository/${data.repositoryId}`);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && { borderColor: '#d73a4a' }]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: '#d73a4a' }]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
        style={[styles.input, formik.touched.rating && formik.errors.rating && { borderColor: '#d73a4a' }]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <Pressable
        onPress={formik.handleSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.buttonText}>Create Review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
