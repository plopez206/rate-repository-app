import { StyleSheet, View } from 'react-native';
import {Route, Routes, Navigate} from 'react-router-native';
import RepositoryList from './Repositorys/RepositoryList';
import AppBar from './AppBarStuff/AppBar';
import SignIn from './SingIn';
import SingleRepositoryView from './Repositorys/SingleRepositoryView';
import CreateReview from './Reviews/CreateReview';
import MyReviews from './Reviews/MyReviews';

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
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;