import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../components/Img";
import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";
import Button from "../../components/Button";
import { Image } from "../../api/images/types";
import CatModal from "./components/CatModal";
import useImages from "../../hooks/useImages";
import InfoCard from "../../components/InfoCard";

const Home = () => {
  const { data, loading, error, fetchImages } = useImages();
  const [modalCatOpen, setModalCatOpen] = useState(false);
  const navigate = useNavigate();
  const { catId } = useParams();

  const openModal = (cat: Image) => {
    setModalCatOpen(true);
    navigate(`/cat/${cat.id}`);
  };

  const closeModal = () => {
    setModalCatOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (catId) {
      setModalCatOpen(true);
      navigate(`/cat/${catId}`);
    }
  }, [catId]);

  return (
    <div>
      <h1 className="text-center pb-2">
        Discover new amazing cats<span>&#127752;</span>
      </h1>
      {error && (
        <InfoCard status="error">{"Ooops, something went wrong"}</InfoCard>
      )}

      {data.length > 0 ? (
        <>
          <List>
            {data.map((cat) => (
              <ListItem key={cat.id} onClick={() => openModal(cat)}>
                <Img src={cat.url} alt="random cat" />
              </ListItem>
            ))}
          </List>
          <div className="flex justify-center p-3">
            {loading ? (
              <InfoCard status="info">{"Loading"}</InfoCard>
            ) : (
              <Button onClick={fetchImages}>Load More</Button>
            )}
          </div>

          {modalCatOpen && <CatModal onClose={closeModal} />}
        </>
      ) : (
        <InfoCard status="info">{"Loading"}</InfoCard>
      )}
    </div>
  );
};

export default Home;
