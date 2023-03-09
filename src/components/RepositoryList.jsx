import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <RepositoryItem item={item} />
);

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if(loading){
    return(
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  if(data){
    const repositories = data.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
};

export default RepositoryList;