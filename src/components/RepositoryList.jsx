import { FlatList, View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, Component } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const props = this.props;
    const { sortBy, setSortBy, text, setText } = props;

    const onChangeText = (value) => {
      setText(value)
    }

    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text} 
        />
        <Picker
          selectedValue={sortBy}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Newest" value="new"/>
          <Picker.Item label="Highest rated" value="top" />
          <Picker.Item label="Lowest rated" value="low" />
        </Picker>
      </>
    );
  };

  render() {
    const props = this.props;
    const { loading, repositories, navigate, onEndReach } = props;

    const onPress = (id) => {
      navigate(`/repository/${id}`);
    }

    if(loading){
      return(
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }
    if(repositories) {
      const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
      return (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPress(item.id)}>
              <RepositoryItem item={item} id={item.id}/>
            </Pressable>
          )
          }
          keyExtractor={item => item.id}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      );
    }
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("new");
  const navigate = useNavigate();
  const [text, setText] = useState();
  const [bouncedvalue] = useDebounce(text, 500);
  const { data, loading, fetchMore } = useRepositories(sortBy, bouncedvalue);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };


  return (
    <RepositoryListContainer 
      loading={loading} 
      repositories={data?.repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
      navigate={navigate}
      text={text}
      setText={setText}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;