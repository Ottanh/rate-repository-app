import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';


import theme from '../theme';
import Tab from './Tab';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
  },
  scrollview: {
    flexDirection: 'row',
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollview}>
        <Tab text="Repositories" path="/" />
        <Tab text="Sign in" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;