import { getData, saveData } from './storage.js';

const FAVORITES_KEY = 'favorites';

export function saveFavorite(book) {
  const favorites = getData(FAVORITES_KEY);
  favorites.push(book);
  saveData(FAVORITES_KEY, favorites);
  alert('Book added to favorites!');
}