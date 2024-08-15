---

# Job Listing App

A React Native application for browsing job listings, bookmarking jobs, and viewing saved bookmarks.

## Features

- **Job Listings**: Browse through available job listings with details.
- **Bookmark Jobs**: Bookmark job listings to view later.
- **View Bookmarks**: Access and view all bookmarked jobs.
- **Offline Storage**: Bookmarks are saved locally for offline access.

## Project Structure

```
joblistingapp/
├── api/
│   └── api.js                # API functions for fetching jobs
├── screens/
│   ├── BookmarksScreen.js    # Screen displaying bookmarked jobs
│   ├── JobDetailScreen.js    # Screen displaying details of a single job
│   └── JobsScreen.js         # Main screen displaying job listings
├── components/
│   ├── BookmarkManager.js    # Functions for managing bookmarks (save, remove, get)
│   └── AppNavigator.js       # App navigation setup
├── App.js                    # Main entry point of the app
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation
```

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd joblistingapp
   ```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) installed. Then run:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Additional Dependencies**

   Ensure you have the required dependencies:

   ```bash
   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-vector-icons @react-native-async-storage/async-storage
   ```

4. **Run the Application**

   For development, you can start the app with:

   ```bash
   npm start
   # or
   yarn start
   ```

   Follow the instructions in the terminal to open the app on an emulator or physical device.

## Mobile Application Screens

### Screen 1 

- **Screenshot:** -> Job Lists Screen
  ![Job Lists Screen](MobileAppScreenShots/JobListPage.jpg)

### Screen 2 

- **Screenshot:** --> BookMark Screen
  ![BookMark Screen](MobileAppScreenShots/BookmarkedPage.jpg)

### Screen 3

- **Screenshot:** -> View Details Page
  ![View Details Page](MobileAppScreenShots/JobListPage.jpg)


## Components

### `api/api.js`

Handles API calls for fetching job listings. Replace with actual API endpoints as needed.

### `screens/JobsScreen.js`

Displays a list of job postings. Allows users to bookmark jobs and view job details.

### `screens/BookmarksScreen.js`

Displays a list of bookmarked jobs. Fetches bookmarked jobs from local storage and displays them.

### `screens/JobDetailScreen.js`

Shows detailed information about a specific job. Accessible from the `JobsScreen`.

### `components/BookmarkManager.js`

Provides functions to save, remove, and retrieve bookmarks using `AsyncStorage`.

### `components/AppNavigator.js`

Sets up navigation between screens using `@react-navigation/native` and `@react-navigation/native-stack`.

## Troubleshooting

- **Module Not Found Errors**: Ensure all dependencies are installed and properly linked.
- **Bookmark Not Showing**: Verify that bookmarks are being saved and retrieved correctly. Ensure local storage is properly functioning.

