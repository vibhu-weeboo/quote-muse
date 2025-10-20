const FAVORITES_KEY = 'quoteMuseFavorites';

export const getFavorites = (): string[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    return [];
  }
};

export const saveFavorites = (favorites: string[]): void => {
  try {
    const favoritesJson = JSON.stringify(favorites);
    localStorage.setItem(FAVORITES_KEY, favoritesJson);
  } catch (error) {
    console.error("Failed to save favorites to localStorage", error);
  }
};
