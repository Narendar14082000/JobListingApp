// screens/BookmarksScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { BookmarkContext } from '../context/BookmarkContext';
import Icon from 'react-native-vector-icons/Ionicons';

const BookmarksScreen = ({ navigation }) => {
  const { bookmarkedJobs, removeBookmark } = useContext(BookmarkContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetail', { job: item })}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{item.title || 'Not Available'}</Text>
        <TouchableOpacity onPress={() => removeBookmark(item.id)}>
          <Icon name="bookmark" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <Text style={styles.details}><Icon name="location-outline" size={18} /> {item.primary_details?.Place || 'Not Available'}</Text>
      <Text style={styles.details}><Icon name="cash-outline" size={18} /> Salary: {item.primary_details?.Salary || 'Not Available'}</Text>
      <Text style={styles.details}><Icon name="briefcase-outline" size={18} /> Experience: {item.primary_details?.Experience || 'Not Available'}</Text>
    </TouchableOpacity>
  );

  if (bookmarkedJobs.length === 0) return <Text>No bookmarked jobs available</Text>;

  return (
    <FlatList
      data={bookmarkedJobs}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
});
