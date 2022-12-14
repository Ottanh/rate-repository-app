import { Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
  },
});

const Tab = ({text, path}) => {
  const navigate = useNavigate();

  const onPressFunction = () => {
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