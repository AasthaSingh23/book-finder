// src/utils/localStorage.js

const FAVORITES_KEY = 'bookFinderFavorites';

// 1. Load favorites from local storage
export const loadFavorites = () => {
  try {
    const serializedState = localStorage.getItem(FAVORITES_KEY);
    // Returns an array of book IDs or an empty array if not found
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Error loading favorites from local storage:", err);
    return [];
  }
};

// 2. Save favorites to local storage
const saveFavorites = (favoritesArray) => {
  try {
    const serializedState = JSON.stringify(favoritesArray);
    localStorage.setItem(FAVORITES_KEY, serializedState);
  } catch (err) {
    console.error("Error saving favorites to local storage:", err);
  }
};

// 3. Toggle a book's favorite status (add or remove)
export const toggleFavorite = (bookId, currentFavorites) => {
  let newFavorites;
  
  if (currentFavorites.includes(bookId)) {
    // Remove the ID
    newFavorites = currentFavorites.filter(id => id !== bookId);
  } else {
    // Add the ID
    newFavorites = [...currentFavorites, bookId];
  }
  
  // Save the updated list and return it
  saveFavorites(newFavorites);
  return newFavorites;
};