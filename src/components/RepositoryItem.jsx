import { StyleSheet, View, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    backgroundColor: 'white'
  },
  tinyAvatar: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 5
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 12,
    paddingRight: 12
  },
  descriptionContainer: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'space-around'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 3,
    borderRadius: 5,
    marginTop: 6
  }
});



const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyAvatar}
          source={{ uri: item.ownerAvatarUrl}}
        />
        <View style={styles.descriptionContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text>Description: {item.description}</Text>
          <View style={styles.languageContainer}>
            <Text color="textSecondary">{item.language}</Text>
          </View>
        </View>
      </View>


      <View style={styles.statsContainer}>
        <View >
          <Text fontWeight="bold">{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View >
          <Text fontWeight="bold">{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View >
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View >
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>

    </View>
  );
};

export default RepositoryItem;