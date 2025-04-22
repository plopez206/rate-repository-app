import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';
import Text from '../Text';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signIn">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
