import { useState, useEffect } from "react";
import api from "../../api";
import { Image } from "../../api/images/types";
import Button from "../../components/Button";
import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";

const Home = () => {
  const [cats, setCats] = useState<Image[]>([]);

  useEffect(() => {
    fetchRandomCats();
  }, []);

  const fetchRandomCats = async () => {
    const { data } = await api.images.batch.get();

    setCats((prevCats) => [...prevCats, ...data]);
  };

  return (
    <div>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id} onClick={() => console.log(cat)}>
            <img
              src={cat.url}
              alt="random cat"
              style={{
                width: "200px",
                height: "200px",
                margin: "10px",
                cursor: "pointer",
              }}
            />{" "}
          </ListItem>
        ))}
      </List>
      <div className="flex justify-center p-3">
        <Button onClick={fetchRandomCats}>Load More</Button>
      </div>
    </div>
  );
};

export default Home;
