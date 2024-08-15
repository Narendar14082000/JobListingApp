
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobDetailScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title || 'Not Available'}</Text>
      <Text style={styles.details}>Location: {job.primary_details?.Place || 'Not Available'}</Text>
      <Text style={styles.details}>Salary: {job.primary_details?.Salary || 'Not Available'}</Text>
      <Text style={styles.details}>Experience: {job.primary_details?.Experience || 'Not Available'}</Text>
      <Text style={styles.details}>Job Type: {job.primary_details?.Job_Type || 'Not Available'}</Text>
      <Text style={styles.details}>Phone: {job.phone || 'Not Available'}</Text>
    </View>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    marginVertical: 5,
  },
});
