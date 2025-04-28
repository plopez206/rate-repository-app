import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',        // list + header BG
  },
  headerContainer: {
    backgroundColor: '#e1e4e8',        // light grey
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',          // white input bg
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    color: 'black',
  },
  pickerContainer: {
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, order, setOrder } = this.props;

    return (
      <View style={styles.headerContainer}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories"
            placeholderTextColor="gray"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          {searchKeyword.length > 0 && (
            <Pressable onPress={() => setSearchKeyword('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </Pressable>
          )}
        </View>

        {/* Sort dropdown */}
        <View style={styles.pickerContainer}>
          {Platform.OS === 'web' ? (
            <select
              value={order}
              onChange={e => setOrder(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: 16,
                color: '#333',
              }}
            >
              <option value="latest">Latest repositories</option>
              <option value="highest">Highest rated repositories</option>
              <option value="lowest">Lowest rated repositories</option>
            </select>
          ) : (
            <Picker
              selectedValue={order}
              onValueChange={value => setOrder(value)}
              style={styles.picker}
              dropdownIconColor="gray"
              mode="dropdown"
            >
              <Picker.Item label="Latest repositories" value="latest" />
              <Picker.Item label="Highest rated repositories" value="highest" />
              <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
          )}
        </View>
      </View>
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];

    return (
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}
