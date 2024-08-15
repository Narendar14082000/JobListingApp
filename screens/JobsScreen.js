
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchJobs } from '../api/api';
import { saveBookmark, removeBookmark, getBookmarks } from './BookmarkManager';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    loadJobs();
    fetchBookmarks();
  }, []);

  const loadJobs = async () => {
    try {
      const newJobs = await fetchJobs();
      setJobs(newJobs);
      setLoading(false);
      setHasMore(newJobs.length > 0);
    } catch (err) {
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    const bookmarks = await getBookmarks();
    setBookmarkedJobs(bookmarks);
  };

  const handleBookmark = async (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      await removeBookmark(jobId);
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      await saveBookmark(jobId);
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title || 'Not Available'}</Text>
        <TouchableOpacity onPress={() => handleBookmark(item.id)}>
          <Icon name={bookmarkedJobs.includes(item.id) ? "bookmark" : "bookmark-outline"} size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {item.primary_details && (
        <View>
          <Text style={styles.details}><Icon name="location-outline" size={18} /> {item.primary_details.Place || 'Not Available'}</Text>
          <Text style={styles.details}><Icon name="cash-outline" size={18} /> Salary: {item.primary_details.Salary || 'Not Available'}</Text>
          <Text style={styles.details}><Icon name="briefcase-outline" size={18} /> Experience: {item.primary_details.Experience || 'Not Available'}</Text>
          <Text style={styles.details}><Icon name="construct-outline" size={18} /> Job Type: {item.primary_details.Job_Type || 'Not Available'}</Text>
        </View>
      )}
      <Text style={styles.details}><Icon name="call-outline" size={18} /> Phone: {item.phone || 'Not Available'}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobDetail', { job: item })}>
          <Icon name="information-circle-outline" size={20} color="white" />
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;
  if (jobs.length === 0) return <Text>No jobs available</Text>;

  return (
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={item => item.id ? item.id.toString() : 'default-key'}
      onEndReached={loadJobs}
      onEndReachedThreshold={0.5}
    />
  );
};

export default JobsScreen;

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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});
