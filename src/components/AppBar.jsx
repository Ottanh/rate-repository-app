import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { gql, useQuery } from '@apollo/client';
import theme from '../theme';
import Tab from './Tab';

const GET_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: Constants.statusBarHeight + 12,
    backgroundColor: theme.colors.darkBackground,
  },
  scrollview: {
    flexDirection: 'row',
  }
});

const AppBar = () => {
  const user = useQuery(GET_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollview}>
        <Tab text="Repositories" path="/" />
        {!user?.data?.me && 
          <>
            <Tab text="Sign in" path="/signin" />
            <Tab text="Sign up" path="/signup" />
          </>
        }
        {user?.data?.me && 
          <>
            <Tab text="Create review" path="/create-review" />
            <Tab text="My reviews" path="/myreviews" />
            <Tab text="Sign out" signout={true} />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;