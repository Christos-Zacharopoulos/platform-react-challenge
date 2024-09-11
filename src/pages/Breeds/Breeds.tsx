import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";
import useBreeds from "../../hooks/useBreeds";
import InfoCard from "../../components/InfoCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routing } from "../../config/routing";
import { Breed } from "../../api/breeds/types";
import BreedImg from "./components/BreedImg";
import BreedModal from "./components/BreedModal";

const Breeds = () => {
  const { data, loading, error, observerRef } = useBreeds();
  const [modalBreed, setModalBreed] = useState<Breed | null>(null);

  const navigate = useNavigate();
  const { breedId } = useParams();

  const openModal = (breed: Breed) => {
    setModalBreed(breed);
    navigate(routing.breed(breed.id));
  };

  const closeModal = () => {
    setModalBreed(null);
    navigate(routing.breeds());
  };

  useEffect(() => {
    if (breedId) {
      setModalBreed(data.find((breed) => breed.id === breedId) || null);
    }
  }, [data, breedId]);

  return (
    <div>
      <h1 className="text-center pb-2">
        Learn more about cat breeds <span>&#128269;</span>
      </h1>{" "}
      <List>
        {loading && <InfoCard status="info">{"Loading"}</InfoCard>}
        {error && <InfoCard status="error">{"Something went wrong"}</InfoCard>}
        {data.map((breed, index) => (
          <ListItem key={breed.id} onClick={() => openModal(breed)}>
            {data.length - 1 === index ? (
              <h3 ref={observerRef}>{breed.name}</h3>
            ) : (
              <h3>{breed.name}</h3>
            )}
            <BreedImg id={breed.reference_image_id} />
          </ListItem>
        ))}
      </List>
      {modalBreed && <BreedModal breed={modalBreed} onClose={closeModal} />}
    </div>
  );
};

export default Breeds;
