import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../../graphql/queries';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../../hooks/useAuthStorage';
import AppBarTab from './AppBarTab';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  signOutTab: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  signOutText: {
    color: '#ff5a5f', // rojo bonito, no demasiado agresivo
    fontWeight: 'bold',
    fontSize: 16,
  }
});

const AppBar = () => {
  const { data, loading } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/', { replace: true });
  };

  const signedIn = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {signedIn ? (
          <>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <Pressable onPress={signOut} style={styles.signOutTab}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <AppBarTab to="/signin">Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
