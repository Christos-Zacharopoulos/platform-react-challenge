import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../../components/Modal";
import Img from "../../../../components/Img";
import Button from "../../../../components/Button";
import { routing } from "../../../../config/routing";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import useImage from "../../../../hooks/useImage";
import ListItem from "../../../../components/List/components/ListItem";
import InfoCard from "../../../../components/InfoCard";
import useFavorites from "../../../../hooks/useFavorites";

type CatModalProps = {
  onClose: () => void;
};

const CatModal = ({ onClose }: CatModalProps) => {
  const { catId } = useParams();
  const { data, loading, error } = useImage(catId);
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const copyLink = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  };

  const openBreedModal = () => {
    navigate(routing.breed(data?.breeds[0].id));
  };

  return (
    <Modal isOpen={!!data} onClose={onClose}>
      {loading && <InfoCard status="info">{"Loading"}</InfoCard>}
      {error && <InfoCard status="error">{"Something went wrong"}</InfoCard>}
      {data && (
        <ListItem>
          <div className="relative">
            {isFavorite(data.id) && (
              <div className="absolute right-4 top-4">&#10084;</div>
            )}
            <Img alt={"cat-image"} src={data.url} />
          </div>
          {data?.breeds?.length > 0 && (
            <div className="text-white w-full">
              <h2>{data.breeds[0].name}</h2>
              <p>{data.breeds[0].description}</p>
              <Button onClick={openBreedModal}>
                More about {data.breeds[0].name}
              </Button>
            </div>
          )}
          <div className="w-full p-3 flex justify-evenly">
            {!isFavorite(data.id) ? (
              <Button onClick={() => addToFavorites(data)}>
                Add to Favorites
              </Button>
            ) : (
              <Button onClick={() => removeFromFavorites(data.id)}>
                Remove from Favorites
              </Button>
            )}
            <Button onClick={copyLink}>
              Copy Shareable Link
              {isCopied && (
                <span className="pl-2 text-green-400">&#10003;</span>
              )}
            </Button>
          </div>
        </ListItem>
      )}
    </Modal>
  );
};

export default CatModal;
