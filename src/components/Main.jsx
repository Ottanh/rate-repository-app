import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate, useLocation } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import CreateUser from './CreateUser';
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.lightBackground
  },
});

const Main = () => {
  const loc = useLocation();
  console.log(loc.pathname)
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>        
        <Route path="/" element={<RepositoryList />} exact />        
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} exact /> 
        <Route path="/signup" element={<CreateUser />} exact /> 
        <Route path="/create-review" element={<CreateReview />} exact /> 
        <Route path="/repository/:id" element={<SingleRepository />} exact />   
        <Route path="/myreviews" element={<MyReviews />} exact /> 
      </Routes>
    </View>
  );
};

export default Main;