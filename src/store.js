export const initialStore = () => {
  return {
    message: null,
    characters: JSON.parse(localStorage.getItem("characters")) || [],
    vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    planets: JSON.parse(localStorage.getItem("planets")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  }
}

function getFavoriteType(item) {
  if (item.properties?.model) return "vehicle";
  if (item.properties?.climate) return "planet";
  if (item.properties?.gender) return "character";
  return "unknown";
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CHARACTERS":
      return {
        ...store,
        characters: action.payload
      };
    case "SET_VEHICLES":
      return {
        ...store,
        vehicles: action.payload
      };
    case "SET_PLANETS":
      return {
        ...store,
        planets: action.payload
      };
    case "ADD_FAVORITE": {
      // Solo agrega si no existe un favorito con el mismo uid y el mismo tipo
      const type = action.payload.type || getFavoriteType(action.payload);
      const exists = store.favorites.some(fav => fav.uid === action.payload.uid && (fav.type || getFavoriteType(fav)) === type);
      if (exists) return store;
      const newFavorite = { ...action.payload, type };
      const newFavorites = [...store.favorites, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...store,
        favorites: newFavorites
      };
    }
    case "REMOVE_FAVORITE": {
      const type = action.payload.type || getFavoriteType(action.payload);
      const newFavorites = store.favorites.filter(fav => !(fav.uid === action.payload.uid && (fav.type || getFavoriteType(fav)) === type));
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...store,
        favorites: newFavorites
      };
    }
    default:
      return store;
  }
}
