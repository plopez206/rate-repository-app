import { Text, StyleSheet, View } from 'react-native';
import {Route, Routes, Navigate} from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBarStuff/AppBar';
import SignIn from './SingIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signIn" element={<SignIn/>}/>
      </Routes>
    </View>
  );
};

export default Main;