import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";
import Img from "../../components/Img";
import Button from "../../components/Button";
import { ImagePerBreed } from "../../api/images/types";
import useStorageArray from "../../hooks/useStorageArray";
import { FAVORITES_CONST } from "../../config/consts";
import { routing } from "../../config/routing";

const Favorites = () => {
  const { items: favorites, removeItem } = useStorageArray(FAVORITES_CONST);

  const removeFavorite = (catId: ImagePerBreed["id"]) => {
    removeItem((cat: ImagePerBreed) => cat.id !== catId);
  };

  return (
    <div>
      <h1 className="text-center pb-2">
        Your Favorite Cats<span>&#10084;</span>
      </h1>
      <List>
        {favorites.length > 0 ? (
          favorites.map((cat: ImagePerBreed) => (
            <ListItem key={cat.id}>
              <Img src={cat.url} alt="favorite cat" />
              <Button onClick={() => removeFavorite(cat.id)}>
                Remove from Favorites
              </Button>
            </ListItem>
          ))
        ) : (
          <p className="pt-16 text-center">
            No favorites found.
            <a
              className="block text-pink-500 hover:underline hover:text-pink-300"
              href={routing.home()}
            >
              <span>&#9758;</span>
              Click here to marvel more cats
              <span>&#9756;</span>
            </a>
          </p>
        )}
      </List>
    </div>
  );
};

export default Favorites;
