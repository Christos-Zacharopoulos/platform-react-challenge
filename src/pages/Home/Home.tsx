import { useState, useEffect } from "react";
import api from "../../api";
import { Image } from "../../api/images/types";

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
      <div>
        {cats.map((cat) => (
          <div key={cat.id}>
            <img
              src={cat.url}
              alt="random cat"
              style={{
                width: "200px",
                height: "200px",
                margin: "10px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
