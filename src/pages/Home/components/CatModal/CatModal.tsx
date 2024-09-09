import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../../components/Modal";
import Img from "../../../../components/Img";
import List from "../../../../components/List";
import Button from "../../../../components/Button";
import api from "../../../../api";
import { routing } from "../../../../config/routing";
import { Image, ImagePerBreed } from "../../../../api/images/types";
import { Breed } from "../../../../api/breeds/types";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import useStorageArray from "../../../../hooks/useStorageArray";
import { FAVORITES_CONST } from "../../../../config/consts";

type CatModalProps = {
  onClose: () => void;
};

const CatModal = ({ onClose }: CatModalProps) => {
  const { catId } = useParams();
  const [cat, setCat] = useState<ImagePerBreed | null>(null);
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const {
    items: favorites,
    addItem,
    removeItem,
  } = useStorageArray(FAVORITES_CONST);
  const [isFavorite, setIsFavorite] = useState(() => {
    return !!favorites.find((fav: ImagePerBreed) => fav.id === catId);
  });
  const navigate = useNavigate();

  const fetchCatById = async (id: Image["id"]) => {
    const { data } = await api.images.single.get(id);
    setCat(data);
  };

  useEffect(() => {
    if (catId) {
      fetchCatById(catId);
    }
  }, []);

  const addToFavorites = (cat: ImagePerBreed) => {
    addItem(cat);
    setIsFavorite(true);
  };

  const removeFromFavorites = () => {
    removeItem((fav: ImagePerBreed) => fav.id !== cat?.id);
    setIsFavorite(false);
  };

  const copyLink = () => {
    const currentUrl = window.location.href;

    copyToClipboard(currentUrl);
  };

  const openBreedModal = () => {
    navigate(routing.breed(cat?.breeds[0].id));
  };

  if (!cat) return null;

  return (
    <Modal isOpen={!!cat} onClose={onClose}>
      <List>
        <div className="relative">
          {isFavorite && <div className="absolute right-4 top-4">&#10084;</div>}
          <Img alt={"cat-image"} src={cat.url} />
        </div>
        {cat?.breeds?.length > 0 && (
          <div className="text-white w-full">
            <h2>{cat.breeds[0].name}</h2>
            <p>{cat.breeds[0].description}</p>
            <Button onClick={openBreedModal}>
              More about {cat.breeds[0].name}
            </Button>
          </div>
        )}
        <div className="w-full p-3 flex justify-evenly">
          {!isFavorite ? (
            <Button onClick={() => addToFavorites(cat)}>
              Add to Favorites
            </Button>
          ) : (
            <Button onClick={removeFromFavorites}>Remove from Favorites</Button>
          )}
          <Button onClick={copyLink}>
            Copy Shareable Link
            {isCopied && <span className="pl-2 text-green-400">&#10003;</span>}
          </Button>
        </div>
      </List>
    </Modal>
  );
};

export default CatModal;
