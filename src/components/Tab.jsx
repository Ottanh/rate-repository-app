import { Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
  },
});

const Tab = ({text, path, signout = false}) => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onPressFunction = async () => {
    if(signout) {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    }
    console.log('press');
    navigate(path)
  }

  return (
    <Pressable onPress={onPressFunction} style={styles.container}>
      <Text color="textSecondary" fontWeight="bold" fontSize="subheading">{text}</Text>
    </Pressable>
  );
};

export default Tab;