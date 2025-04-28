import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native'; // 👈 añade esto al principio
import { useApolloClient } from '@apollo/client'; 

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e1e4e8',
    flex: 1,
    paddingTop: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'white',
    marginTop: 10
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Too Short!!')
    .max(50, 'Too Long!!')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Too Short!!')
    .max(30, `Don't go overboard either`)
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' },
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' },
        ]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};


const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const apolloClient = useApolloClient(); 


  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { authenticate } = await signIn({ username, password });

      console.log('Access token:', authenticate.accessToken);

      await apolloClient.resetStore();  
      navigate('/');                    

    } catch (e) {
      console.log('Sign in error:', e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
