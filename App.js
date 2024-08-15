
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import JobsScreen from './screens/JobsScreen';
import JobDetailScreen from './screens/JobDetailScreen';
import BookmarksScreen from './screens/BookmarksScreen';

// Create Stack Navigator for Job Details
const JobStack = createNativeStackNavigator();
const JobStackNavigator = () => (
  <JobStack.Navigator>
    <JobStack.Screen name="JobsList" component={JobsScreen} options={{ title: 'Jobs' }} />
    <JobStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Details' }} />
  </JobStack.Navigator>
);

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
        name="JobsDetails" 
        component={JobStackNavigator} 
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
