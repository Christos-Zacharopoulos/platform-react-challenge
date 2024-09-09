import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../components/Img";
import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";
import Button from "../../components/Button";
import api from "../../api";
import { Image } from "../../api/images/types";
import CatModal from "./components/CatModal";

const Home = () => {
  const [cats, setCats] = useState<Image[]>([]);
  const [modalCatOpen, setModalCatOpen] = useState(false);
  const navigate = useNavigate();
  const { catId } = useParams();

  useEffect(() => {
    fetchRandomCats();
  }, []);

  const fetchRandomCats = async () => {
    const { data } = await api.images.batch.get();

    setCats((prevCats) => [...prevCats, ...data]);
  };

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
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id} onClick={() => openModal(cat)}>
            <Img src={cat.url} alt="random cat" />
          </ListItem>
        ))}
      </List>
      <div className="flex justify-center p-3">
        <Button onClick={fetchRandomCats}>Load More</Button>
      </div>
      {modalCatOpen && <CatModal onClose={closeModal} />}
    </div>
  );
};

export default Home;
