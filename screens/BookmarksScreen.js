
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getBookmarks } from './BookmarkManager';
import { fetchJobs } from '../api/api';

const BookmarksScreen = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmarks = await getBookmarks();
        setBookmarkedJobs(bookmarks);
        
        // Fetch jobs to match the bookmarked ones
        const allJobs = await fetchJobs();
        setJobs(allJobs.filter(job => bookmarks.includes(job.id)));
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookmarked jobs');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title || 'Not Available'}</Text>
      <Text style={styles.details}>Location: {item.primary_details?.Place || 'Not Available'}</Text>
      <Text style={styles.details}>Salary: {item.primary_details?.Salary || 'Not Available'}</Text>
      <Text style={styles.details}>Experience: {item.primary_details?.Experience || 'Not Available'}</Text>
      <Text style={styles.details}>Job Type: {item.primary_details?.Job_Type || 'Not Available'}</Text>
      <Text style={styles.details}>Phone: {item.phone || 'Not Available'}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;
  if (jobs.length === 0) return <Text>No bookmarked jobs</Text>;

  return (
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={item => item.id ? item.id.toString() : 'default-key'}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
});
