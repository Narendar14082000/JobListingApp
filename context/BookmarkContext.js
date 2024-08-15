// context/BookmarkContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    loadBookmarksFromStorage();
  }, []);

  const loadBookmarksFromStorage = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
      if (storedBookmarks) {
        setBookmarkedJobs(JSON.parse(storedBookmarks));
      }
    } catch (e) {
      console.log('Failed to load bookmarks');
    }
  };

  const saveBookmark = async (job) => {
    const updatedBookmarks = [...bookmarkedJobs, job];
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = async (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter(job => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedJobs, saveBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
