import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import AppBarTab from './AppBarTab';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../../hooks/useAuthStorage';
import  Text from '../Text';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  if (loading) {
    return null; // Puedes mostrar un spinner si quieres
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/', { replace: true });
  }



  const signedIn = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {signedIn ? (
          <Pressable onPress={signOut}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingHorizontal: 20, paddingVertical: 10 }}>Sign Out</Text>
          </Pressable>
        ) : (
          <AppBarTab to="/signin">Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
