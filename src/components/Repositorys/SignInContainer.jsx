import { View, TextInput, Pressable, Text } from 'react-native';
import { Formik } from 'formik';

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <View>
          <TextInput
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
          />
          <TextInput
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
          />
          <Pressable onPress={handleSubmit}>
            <Text>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;
