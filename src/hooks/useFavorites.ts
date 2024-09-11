import { ImagePerBreed } from "../api/images/types";
import { FAVORITES_CONST } from "../config/consts";
import useStorageArray from "./useStorageArray";

const useFavorites = () => {
  const {
    items: favorites,
    addItem,
    removeItem,
  } = useStorageArray(FAVORITES_CONST);

  const isFavorite = (id: ImagePerBreed["id"]) =>
    !!favorites.find((fav: ImagePerBreed) => fav.id === id);

  // const [favorite, setFavorite] = useState(() => {});
  const addToFavorites = (cat: ImagePerBreed) => {
    addItem(cat);
    // setIsFavorite(true);
  };

  const removeFromFavorites = (id: ImagePerBreed["id"]) => {
    removeItem((fav: ImagePerBreed) => fav.id !== id);
    // setIsFavorite(false);
  };

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
};

export default useFavorites;
