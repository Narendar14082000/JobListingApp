
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a bookmark
export const saveBookmark = async (jobId) => {
  try {
    let bookmarks = await getBookmarks();
    if (!bookmarks.includes(jobId)) {
      bookmarks.push(jobId);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

// Remove a bookmark
export const removeBookmark = async (jobId) => {
  try {
    let bookmarks = await getBookmarks();
    bookmarks = bookmarks.filter(id => id !== jobId);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

// Get all bookmarks
export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};
